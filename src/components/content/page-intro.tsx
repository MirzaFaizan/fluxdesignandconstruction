export function PageIntro({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="nav-link text-foreground/70">{kicker}</p>
      <h1 className="font-display mt-5 text-4xl text-pretty sm:text-5xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
        {lede}
      </p>
    </header>
  );
}
