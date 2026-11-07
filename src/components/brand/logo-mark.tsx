import { cn } from "@/lib/utils";
import Image from "next/image";
import fluxMark from "./flux-mark.png";

type LogoMarkProps = {
  className?: string;
  title?: string;
};

export function LogoMark({ className, title }: LogoMarkProps) {
  return (
    <Image
      src={fluxMark}
      alt={title ?? ""}
      className={cn("size-8", className)}
      unoptimized
      aria-hidden={title ? undefined : true}
    />
  );
}
