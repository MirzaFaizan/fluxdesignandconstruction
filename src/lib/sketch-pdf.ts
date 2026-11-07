import fluxMark from "@/components/brand/flux-mark.png";
import type { Locale } from "@/i18n/routing";
import { phoneDisplay } from "@/lib/contact";
import {
  indicativeCovered,
  pdfFileName,
  plotLabel,
  PLOT_TEMPLATES,
  roomLabel,
  roomSizeLabel,
  roomsArea,
  type SimilarSketchProject,
  type SketchPdfCopy,
  type SketchState,
} from "@/lib/sketch";
import { jsPDF } from "jspdf";

type BuildArgs = {
  locale: Locale;
  state: SketchState;
  planDataUrl: string;
  similar: SimilarSketchProject | null;
  copy: SketchPdfCopy;
  shareUrl: string;
};

const STEEL: [number, number, number] = [93, 109, 128];
const CHARCOAL: [number, number, number] = [43, 54, 66];
const PAGE_W = 210;
const MARGIN = 16;

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function imageToJpeg(
  img: HTMLImageElement,
  maxEdge = 1400,
  quality = 0.82
): string {
  const nw = img.naturalWidth || img.width;
  const nh = img.naturalHeight || img.height;
  const scale = Math.min(1, maxEdge / Math.max(nw, nh, 1));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(nw * scale));
  canvas.height = Math.max(1, Math.round(nh * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.fillStyle = "#2b3642";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}

function dataUrlToJpeg(dataUrl: string, maxEdge = 1400): Promise<string> {
  return new Promise((resolve) => {
    if (!dataUrl) {
      resolve("");
      return;
    }
    const img = new Image();
    img.onload = () => resolve(imageToJpeg(img, maxEdge, 0.84));
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [text];
}

function rasterText(
  text: string,
  opts: {
    widthMm: number;
    fontSize: number;
    fontFamily: string;
    color: string;
    align: CanvasTextAlign;
    dir: "ltr" | "rtl";
    lineHeight: number;
  }
): { dataUrl: string; widthMm: number; heightMm: number } {
  const pxPerMm = 8;
  const widthPx = Math.max(40, Math.round(opts.widthMm * pxPerMm));
  const canvas = document.createElement("canvas");
  const measure = canvas.getContext("2d");
  if (!measure) {
    return { dataUrl: "", widthMm: opts.widthMm, heightMm: 8 };
  }
  measure.font = `${opts.fontSize}px ${opts.fontFamily}`;
  const lines = wrapLines(measure, text, widthPx);
  const linePx = opts.fontSize * opts.lineHeight;
  const heightPx = Math.ceil(lines.length * linePx + 8);
  const dpr = 2;
  canvas.width = widthPx * dpr;
  canvas.height = heightPx * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return { dataUrl: "", widthMm: opts.widthMm, heightMm: heightPx / pxPerMm };
  }
  ctx.scale(dpr, dpr);
  ctx.font = `${opts.fontSize}px ${opts.fontFamily}`;
  ctx.fillStyle = opts.color;
  ctx.textAlign = opts.align;
  ctx.direction = opts.dir;
  ctx.textBaseline = "top";
  const x =
    opts.align === "right"
      ? widthPx
      : opts.align === "center"
        ? widthPx / 2
        : 0;
  lines.forEach((line, i) => {
    ctx.fillText(line, x, 4 + i * linePx);
  });
  return {
    dataUrl: canvas.toDataURL("image/png"),
    widthMm: opts.widthMm,
    heightMm: heightPx / pxPerMm,
  };
}

function addText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  opts: {
    locale: Locale;
    fontSize: number;
    maxWidth: number;
    align?: "left" | "right";
    color?: [number, number, number];
    bold?: boolean;
  }
): number {
  const align = opts.align ?? (opts.locale === "ur" ? "right" : "left");
  const color = opts.color ?? CHARCOAL;
  if (opts.locale === "en") {
    doc.setFont("helvetica", opts.bold ? "bold" : "normal");
    doc.setFontSize(opts.fontSize);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, opts.maxWidth) as string[];
    doc.text(lines, x, y, { align });
    return lines.length * (opts.fontSize * 0.4 + 1.2);
  }
  const painted = rasterText(text, {
    widthMm: opts.maxWidth,
    fontSize: Math.round(opts.fontSize * 1.35),
    fontFamily: opts.bold
      ? '"Noto Naskh Arabic", sans-serif'
      : '"Noto Naskh Arabic", sans-serif',
    color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
    align,
    dir: "rtl",
    lineHeight: 2.2,
  });
  if (!painted.dataUrl) return 8;
  const drawX = align === "right" ? x - painted.widthMm : x;
  doc.addImage(
    painted.dataUrl,
    "PNG",
    drawX,
    y - 2,
    painted.widthMm,
    painted.heightMm
  );
  return painted.heightMm;
}

function hairline(doc: jsPDF, y: number) {
  doc.setDrawColor(...STEEL);
  doc.setLineWidth(0.35);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
}

export async function downloadSketchPdf({
  locale,
  state,
  planDataUrl,
  similar,
  copy,
  shareUrl,
}: BuildArgs) {
  const plot = PLOT_TEMPLATES[state.plotId];
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const dirRight = locale === "ur";
  const xStart = dirRight ? PAGE_W - MARGIN : MARGIN;
  const contentW = PAGE_W - MARGIN * 2;
  const today = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());

  const logo = await loadImage(
    typeof fluxMark === "string" ? fluxMark : fluxMark.src
  );
  if (logo) {
    const logoW = 14;
    const logoH = (logo.height / logo.width) * logoW;
    const logoX = dirRight ? PAGE_W - MARGIN - logoW : MARGIN;
    doc.addImage(logo, "PNG", logoX, 12, logoW, logoH);
  }

  let y = 16;
  y += addText(doc, copy.studio, xStart, y, {
    locale,
    fontSize: 11,
    maxWidth: contentW - 20,
    bold: true,
  });
  y += 2;
  hairline(doc, y);
  y += 8;

  y += addText(doc, copy.packTitle, xStart, y, {
    locale,
    fontSize: 16,
    maxWidth: contentW,
    bold: true,
  });
  y += 2;
  y += addText(doc, plotLabel(plot, locale), xStart, y, {
    locale,
    fontSize: 11,
    maxWidth: contentW,
  });
  if (state.society.trim()) {
    y += addText(
      doc,
      `${copy.societyLabel} ${state.society.trim()}`,
      xStart,
      y,
      { locale, fontSize: 10, maxWidth: contentW }
    );
  }
  y += addText(
    doc,
    `${copy.sketchIdLabel} ${state.id}  ·  ${copy.dateLabel} ${today}`,
    xStart,
    y,
    { locale, fontSize: 9, maxWidth: contentW, color: STEEL }
  );
  y += 4;

  const planW = contentW;
  const planH = 118;
  doc.setFillColor(43, 54, 66);
  doc.rect(MARGIN, y, planW, planH, "F");
  const planJpeg = await dataUrlToJpeg(planDataUrl, 1600);
  if (planJpeg) {
    doc.addImage(planJpeg, "JPEG", MARGIN + 2, y + 2, planW - 4, planH - 4);
  }
  y += planH + 4;
  y += addText(doc, copy.frontLabel, xStart, y, {
    locale,
    fontSize: 9,
    maxWidth: contentW,
    color: STEEL,
  });
  y += 4;
  y += addText(doc, copy.disclaimer, xStart, y, {
    locale,
    fontSize: 9,
    maxWidth: contentW,
  });

  doc.addPage();
  y = 18;
  y += addText(doc, copy.scheduleTitle, xStart, y, {
    locale,
    fontSize: 16,
    maxWidth: contentW,
    bold: true,
  });
  y += 4;
  hairline(doc, y);
  y += 8;

  const col1 = dirRight ? PAGE_W - MARGIN : MARGIN;
  const col2 = dirRight ? PAGE_W - MARGIN - 70 : MARGIN + 70;
  const col3 = dirRight ? PAGE_W - MARGIN - 120 : MARGIN + 120;

  y += addText(doc, copy.colRoom, col1, y, {
    locale,
    fontSize: 9,
    maxWidth: 60,
    color: STEEL,
    bold: true,
  });
  addText(doc, copy.colSize, col2, y - (locale === "ur" ? 0 : 0), {
    locale: "en",
    fontSize: 9,
    maxWidth: 40,
    color: STEEL,
    bold: true,
    align: dirRight ? "right" : "left",
  });
  addText(doc, copy.colArea, col3, y - (locale === "ur" ? 0 : 0), {
    locale: "en",
    fontSize: 9,
    maxWidth: 40,
    color: STEEL,
    bold: true,
    align: dirRight ? "right" : "left",
  });
  y += locale === "ur" ? 10 : 6;

  if (state.rooms.length === 0) {
    y += addText(doc, "—", xStart, y, {
      locale,
      fontSize: 10,
      maxWidth: contentW,
    });
  } else {
    for (const room of state.rooms) {
      addText(doc, roomLabel(room.type, locale), col1, y, {
        locale,
        fontSize: 10,
        maxWidth: 62,
      });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...CHARCOAL);
      doc.text(roomSizeLabel(room), col2, y, {
        align: dirRight ? "right" : "left",
      });
      doc.text(`${room.w * room.h} sq ft`, col3, y, {
        align: dirRight ? "right" : "left",
      });
      y += locale === "ur" ? 10 : 7;
      if (y > 260) {
        doc.addPage();
        y = 18;
      }
    }
  }

  y += 6;
  hairline(doc, y);
  y += 8;
  const sum = roomsArea(state.rooms);
  const covered = indicativeCovered(state.rooms);
  y += addText(
    doc,
    `${copy.plotArea} ${plot.areaSqFt} sq ft`,
    xStart,
    y,
    { locale, fontSize: 10, maxWidth: contentW }
  );
  y += addText(doc, `${copy.roomsArea} ${sum} sq ft`, xStart, y, {
    locale,
    fontSize: 10,
    maxWidth: contentW,
  });
  y += addText(doc, `${copy.covered} ${covered} sq ft`, xStart, y, {
    locale,
    fontSize: 10,
    maxWidth: contentW,
  });
  y += addText(doc, copy.coveredNote, xStart, y, {
    locale,
    fontSize: 9,
    maxWidth: contentW,
    color: STEEL,
  });
  y += addText(doc, copy.storey, xStart, y, {
    locale,
    fontSize: 10,
    maxWidth: contentW,
  });
  if (plot.family === "5marla") {
    y += 4;
    y += addText(doc, copy.education5, xStart, y, {
      locale,
      fontSize: 10,
      maxWidth: contentW,
    });
  }

  doc.addPage();
  y = 18;
  y += addText(doc, copy.similarTitle, xStart, y, {
    locale,
    fontSize: 16,
    maxWidth: contentW,
    bold: true,
  });
  y += 4;
  hairline(doc, y);
  y += 8;

  if (similar) {
    const photo = await loadImage(similar.src);
    if (photo) {
      const maxW = contentW;
      const maxH = 90;
      const ratio = Math.min(maxW / photo.width, maxH / photo.height);
      const w = photo.width * ratio;
      const h = photo.height * ratio;
      const x = dirRight ? PAGE_W - MARGIN - w : MARGIN;
      const jpeg = imageToJpeg(photo, 1200, 0.82);
      if (jpeg) doc.addImage(jpeg, "JPEG", x, y, w, h);
      y += h + 4;
      y += addText(doc, similar.caption, xStart, y, {
        locale,
        fontSize: 9,
        maxWidth: contentW,
        color: STEEL,
      });
      y += 6;
    }
  }

  y += addText(doc, copy.nextTitle, xStart, y, {
    locale,
    fontSize: 14,
    maxWidth: contentW,
    bold: true,
  });
  y += 2;
  y += addText(doc, copy.nextBody, xStart, y, {
    locale,
    fontSize: 10,
    maxWidth: contentW,
  });
  y += 4;
  y += addText(doc, copy.approvalsLine, xStart, y, {
    locale,
    fontSize: 9,
    maxWidth: contentW,
    color: STEEL,
  });
  y += 4;
  const number = phoneDisplay();
  y += addText(
    doc,
    `${copy.whatsappLine} ${number}`.trim(),
    xStart,
    y,
    { locale, fontSize: 10, maxWidth: contentW }
  );
  y += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...STEEL);
  doc.text(shareUrl, dirRight ? PAGE_W - MARGIN : MARGIN, y, {
    align: dirRight ? "right" : "left",
    maxWidth: contentW,
  });

  doc.save(pdfFileName(state));
}
