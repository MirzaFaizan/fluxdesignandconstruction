import { cn } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type StillProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  priority?: boolean;
  caption?: ReactNode;
  className?: string;
  imageClassName?: string;
  unoptimized?: boolean;
};

export function Still({
  src,
  alt,
  sizes,
  priority = false,
  caption,
  className,
  imageClassName,
  unoptimized = true,
}: StillProps) {
  return (
    <figure className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        className={cn(
          "object-cover outline outline-1 outline-white/10",
          imageClassName
        )}
      />
      {caption ? (
        <figcaption className="pointer-events-none absolute inset-inline-0 bottom-0 bg-background/45 px-4 py-3 text-xs leading-6 text-foreground sm:px-5 sm:text-sm sm:leading-7">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
