#!/usr/bin/env node
/**
 * FluX web-media derive.
 * Hash-dedup Desktop masters, write catalog.json, encode the launch set
 * to AVIF+WebP under web-media/. Does not touch Next app source.
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const OUT = path.join(ROOT, "web-media");
const MASTER_DIRS = [
  "Architecture",
  "Construction",
  "Interior",
  "Landscape",
  "Logo",
];
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff"]);
const AVIF_QUALITY = 75;
const WEBP_QUALITY = 88;

function md5File(file) {
  return new Promise((resolve, reject) => {
    const hash = createHash("md5");
    const stream = createReadStream(file);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
}

async function walk(dir, acc = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, acc);
    } else {
      acc.push(full);
    }
  }
  return acc;
}

function copyScore(rel) {
  const m = rel.match(/ \((\d+)\)/);
  const n = m ? Number(m[1]) : 0;
  return [n, rel.length, rel];
}

async function inventory() {
  const records = [];
  for (const dir of MASTER_DIRS) {
    const files = await walk(path.join(ROOT, dir));
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (ext === ".psd") continue;
      if (!IMAGE_EXT.has(ext)) continue;
      const rel = path.relative(ROOT, file);
      const st = await stat(file);
      const md5 = await md5File(file);
      let width = null;
      let height = null;
      let format = null;
      let hasAlpha = false;
      let alphaMin = null;
      try {
        const meta = await sharp(file, { failOn: "none" }).metadata();
        width = meta.width ?? null;
        height = meta.height ?? null;
        format = meta.format ?? null;
        hasAlpha = Boolean(meta.hasAlpha);
        if (hasAlpha) {
          const stats = await sharp(file, { failOn: "none" })
            .ensureAlpha()
            .stats();
          alphaMin = stats.channels[3]?.min ?? null;
        }
      } catch {
        // skip metadata for unreadable files
      }
      records.push({
        path: rel,
        bytes: st.size,
        md5,
        ext,
        width,
        height,
        format,
        hasAlpha,
        alphaMin,
      });
    }
  }

  const byHash = new Map();
  for (const rec of records) {
    const list = byHash.get(rec.md5) ?? [];
    list.push(rec.path);
    byHash.set(rec.md5, list);
  }

  const unique = [];
  for (const [md5, copies] of byHash) {
    const canonical = [...copies].sort((a, b) => {
      const sa = copyScore(a);
      const sb = copyScore(b);
      for (let i = 0; i < sa.length; i++) {
        if (sa[i] < sb[i]) return -1;
        if (sa[i] > sb[i]) return 1;
      }
      return 0;
    })[0];
    const rec = records.find((r) => r.path === canonical);
    unique.push({ ...rec, copies });
  }
  unique.sort((a, b) => a.path.localeCompare(b.path));

  return {
    root: ROOT,
    scannedAt: new Date().toISOString(),
    imageFiles: records.length,
    uniqueByMd5: unique.length,
    exactDuplicates: records.length - unique.length,
    files: unique,
  };
}

function fitSize(width, height, { maxWidth, maxEdge }) {
  if (!width || !height) return { width: null, height: null };
  let w = width;
  let h = height;
  if (maxWidth && w > maxWidth) {
    h = Math.round((h * maxWidth) / w);
    w = maxWidth;
  }
  const long = Math.max(w, h);
  if (maxEdge && long > maxEdge) {
    const scale = maxEdge / long;
    w = Math.round(w * scale);
    h = Math.round(h * scale);
  }
  return { width: w, height: h };
}

async function encodeItem(item, catalogByPath) {
  const src = path.join(ROOT, item.src);
  const rec = catalogByPath.get(item.src);
  const flattenAccidental =
    rec?.hasAlpha && rec.alphaMin != null && rec.alphaMin > 200;
  const target = fitSize(rec?.width, rec?.height, {
    maxWidth: item.maxWidth,
    maxEdge: item.maxEdge,
  });

  const folder = path.join(OUT, "launch", item.folder);
  await mkdir(folder, { recursive: true });
  const avifPath = path.join(folder, `${item.id}.avif`);
  const webpPath = path.join(folder, `${item.id}.webp`);

  let pipeline = sharp(src, { failOn: "none", limitInputPixels: false }).rotate();
  if (flattenAccidental) {
    pipeline = pipeline.flatten({ background: "#ffffff" });
  }
  if (target.width && target.height) {
    pipeline = pipeline.resize({
      width: target.width,
      height: target.height,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const avifBuf = await pipeline
    .clone()
    .avif({ quality: AVIF_QUALITY, effort: 6, chromaSubsampling: "4:2:0" })
    .toBuffer();
  const webpBuf = await pipeline
    .clone()
    .webp({ quality: WEBP_QUALITY, effort: 5, smartSubsample: true })
    .toBuffer();
  await writeFile(avifPath, avifBuf);
  await writeFile(webpPath, webpBuf);

  const outMeta = await sharp(avifBuf).metadata();
  return {
    ...item,
    source: {
      path: item.src,
      md5: rec?.md5 ?? null,
      width: rec?.width ?? null,
      height: rec?.height ?? null,
      bytes: rec?.bytes ?? null,
      copies: rec?.copies ?? [item.src],
    },
    flattenAccidentalAlpha: Boolean(flattenAccidental),
    derived: {
      width: outMeta.width,
      height: outMeta.height,
      avif: path.relative(OUT, avifPath),
      webp: path.relative(OUT, webpPath),
      avifBytes: avifBuf.length,
      webpBytes: webpBuf.length,
    },
  };
}

function runPython(script) {
  return new Promise((resolve, reject) => {
    const child = spawn("python3", [script], {
      cwd: __dirname,
      stdio: "inherit",
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`python3 ${script} exited ${code}`));
    });
    child.on("error", reject);
  });
}

async function main() {
  await mkdir(OUT, { recursive: true });
  console.log("Cataloguing unique masters…");
  const catalog = await inventory();
  await writeFile(
    path.join(OUT, "catalog.json"),
    JSON.stringify(catalog, null, 2) + "\n",
  );
  console.log(
    `  ${catalog.imageFiles} files, ${catalog.uniqueByMd5} unique, ${catalog.exactDuplicates} exact duplicates`,
  );

  const launch = JSON.parse(
    await readFile(path.join(__dirname, "launch-set.json"), "utf8"),
  );
  const catalogByPath = new Map(catalog.files.map((f) => [f.path, f]));
  // also index copies so a launch src that is a duplicate still resolves
  for (const f of catalog.files) {
    for (const copy of f.copies) catalogByPath.set(copy, f);
  }

  const derived = [];
  for (const item of launch.items) {
    if (!(await stat(path.join(ROOT, item.src)).then(() => true).catch(() => false))) {
      throw new Error(`Launch source missing: ${item.src}`);
    }
    process.stdout.write(`  encode ${item.id}\n`);
    derived.push(await encodeItem(item, catalogByPath));
  }

  console.log("Exporting logo from PSD…");
  await runPython(path.join(__dirname, "export-logo.py"));

  const pairs = {};
  for (const item of derived) {
    if (!item.pair) continue;
    pairs[item.pair] ??= { id: item.pair, cgi: null, site: null };
    if (item.kind === "cgi" || item.roles.includes("proof-cgi")) {
      pairs[item.pair].cgi = item.id;
    }
    if (item.kind === "site" || item.roles.includes("proof-site")) {
      pairs[item.pair].site = item.id;
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    pipeline: "scripts/image-pipeline",
    quality: { avif: AVIF_QUALITY, webp: WEBP_QUALITY },
    catalog: {
      imageFiles: catalog.imageFiles,
      uniqueByMd5: catalog.uniqueByMd5,
      exactDuplicates: catalog.exactDuplicates,
    },
    logo: {
      lockupSvg: "logo/flux-lockup.svg",
      markSvg: "logo/flux-mark.svg",
      lockupPng: "logo/flux-lockup.png",
      favicon512: "logo/favicon-512.png",
      favicon256: "logo/favicon-256.png",
      favicon32: "logo/favicon-32.png",
      appleTouch180: "logo/apple-touch-180.png",
    },
    comparePairs: pairs,
    items: derived,
  };
  await writeFile(
    path.join(OUT, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );

  const avifBytes = derived.reduce((s, i) => s + i.derived.avifBytes, 0);
  const webpBytes = derived.reduce((s, i) => s + i.derived.webpBytes, 0);
  console.log(
    `Launch set: ${derived.length} images, AVIF ${(avifBytes / 1e6).toFixed(2)} MB, WebP ${(webpBytes / 1e6).toFixed(2)} MB`,
  );
  console.log(`Wrote ${path.relative(ROOT, OUT)}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
