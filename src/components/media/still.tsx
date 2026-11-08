import { Picture } from "@/components/media/picture";
import type { MediaImage } from "@/lib/media";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type StillProps = {
  src: MediaImage;
  alt: string;
  sizes: string;
  priority?: boolean;
  caption?: ReactNode;
  /** Must set the aspect ratio (e.g. "aspect-[16/10]") so nothing shifts. */
  className?: string;
  imageClassName?: string;
};

export function Still({
  src,
  alt,
  sizes,
  priority = false,
  caption,
  className,
  imageClassName,
}: StillProps) {
  return (
    <figure className={cn("relative overflow-hidden", className)}>
      <Picture
        image={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={cn("outline outline-1 outline-white/10", imageClassName)}
      />
      {caption ? (
        <figcaption className="pointer-events-none absolute inset-inline-0 bottom-0 bg-background/90 px-4 py-3 text-xs leading-6 text-foreground sm:px-5 sm:text-sm sm:leading-7">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
