import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  title?: string;
};

export function LogoMark({ className, title }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("text-foreground", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M32 6.5c-14.1 0-25.5 11.4-25.5 25.5S17.9 57.5 32 57.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      <path
        d="M32 6.5c5.8 0 11.1 1.9 15.3 5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      <path
        d="M50.4 48.2c3.4-4.5 5.1-10 5.1-16.2 0-4.2-1-8.2-2.8-11.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      <path
        d="M20 22h11.2M20 22v18M20 31h8.4M34.8 22v18h10.4M20.4 42.5v8.2c0 5.4 4.4 8.8 10.2 8.8h.4M43.6 42.5 54 59.2M54 42.5 41.2 59.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
    </svg>
  );
}
