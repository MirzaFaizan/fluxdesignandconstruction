import { MEDIA, MEDIA_BASE, type MediaId } from "./media-manifest.generated";

export type { MediaId };

export type MediaImage = {
  id: MediaId;
  /** Largest WebP rendition; the no-srcset fallback. */
  src: string;
  width: number;
  height: number;
  avifSrcSet: string;
  webpSrcSet: string;
};

function url(id: MediaId, hash: string, width: number, ext: "avif" | "webp") {
  return `${MEDIA_BASE}/${id}.${hash}-${width}.${ext}`;
}

function srcSet(id: MediaId, hash: string, widths: readonly number[], ext: "avif" | "webp") {
  return widths.map((w) => `${url(id, hash, w, ext)} ${w}w`).join(", ");
}

const cache = new Map<MediaId, MediaImage>();

export function media(id: MediaId): MediaImage {
  const hit = cache.get(id);
  if (hit) return hit;
  const { hash, width, height, widths } = MEDIA[id];
  const image: MediaImage = {
    id,
    src: url(id, hash, width, "webp"),
    width,
    height,
    avifSrcSet: srcSet(id, hash, widths, "avif"),
    webpSrcSet: srcSet(id, hash, widths, "webp"),
  };
  cache.set(id, image);
  return image;
}
