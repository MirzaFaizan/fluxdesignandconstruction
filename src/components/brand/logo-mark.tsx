import { cn } from "@/lib/utils";
import Image from "next/image";
import fluxMark from "../../../web-media/logo/favicon-256.png";

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
    />
  );
}
