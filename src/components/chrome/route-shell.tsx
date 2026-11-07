export function PhotoPlane({ label }: { label: string }) {
  return (
    <div
      aria-label={label}
      className="relative mt-12 aspect-[16/9] w-full border border-border bg-[color-mix(in_srgb,var(--background)_92%,black)]"
    >
      <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-foreground/70">
        {label}
      </span>
    </div>
  );
}

export function RouteShell({
  kicker,
  title,
  lede,
  photoLabel,
}: {
  kicker: string;
  title: string;
  lede: string;
  photoLabel: string;
}) {
  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <p className="nav-link text-foreground/70">{kicker}</p>
      <h1 className="font-display mt-5 max-w-3xl text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg">
        {lede}
      </p>
      <PhotoPlane label={photoLabel} />
    </article>
  );
}
