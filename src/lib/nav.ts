export const primaryNav = [
  { href: "/work", key: "work" },
  { href: "/houses", key: "houses" },
  { href: "/interiors", key: "interiors" },
  { href: "/build", key: "build" },
  { href: "/studio", key: "studio" },
  { href: "/contact", key: "contact" },
] as const;

export const footerNav = [
  { href: "/commercial", key: "commercial" },
  { href: "/approvals", key: "approvals" },
  { href: "/faq", key: "faq" },
  { href: "/privacy", key: "privacy" },
] as const;

export type NavKey = (typeof primaryNav)[number]["key"];
export type FooterKey = (typeof footerNav)[number]["key"];
