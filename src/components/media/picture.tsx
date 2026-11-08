import type { MediaImage } from "@/lib/media";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";
import { preload } from "react-dom";

export type PictureProps = {
  image: MediaImage;
  alt: string;
  /** Standard `sizes` attribute, e.g. "(min-width: 768px) 50vw, 100vw". */
  sizes: string;
  /** Above the fold: eager, fetchpriority=high, preloaded. */
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Pre-generated AVIF + WebP renditions with srcset/sizes. Replaces next/image,
 * which has no optimizer on Cloudflare Workers. The img fills its positioned
 * parent by default; pass className to change fit or position.
 */
export function Picture({
  image,
  alt,
  sizes,
  priority = false,
  className,
  style,
}: PictureProps) {
  if (priority) {
    preload(image.src, {
      as: "image",
      type: "image/avif",
      imageSrcSet: image.avifSrcSet,
      imageSizes: sizes,
      fetchPriority: "high",
    });
  }

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={image.avifSrcSet} sizes={sizes} />
      <img
        src={image.src}
        srcSet={image.webpSrcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
        style={style}
      />
    </picture>
  );
}
