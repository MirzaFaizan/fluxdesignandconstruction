export const faqHrefs = [
  "/houses",
  "/build",
  "/approvals",
  "/work",
  "/contact",
  "/studio",
  "/interiors",
  "/sketch",
] as const;

export type FaqHref = (typeof faqHrefs)[number];

type FaqCopy = {
  id: string;
  q:
    | "costQ"
    | "greyQ"
    | "marlaQ"
    | "sketchQ"
    | "boqQ"
    | "cdaSelfQ"
    | "formsQ"
    | "licensedQ"
    | "timingQ"
    | "papersQ"
    | "familyQ"
    | "cgiQ"
    | "reportQ"
    | "whereQ"
    | "overseasQ"
    | "pickQ";
  a1:
    | "costA1"
    | "greyA1"
    | "marlaA1"
    | "sketchA1"
    | "boqA1"
    | "cdaSelfA1"
    | "formsA1"
    | "licensedA1"
    | "timingA1"
    | "papersA1"
    | "familyA1"
    | "cgiA1"
    | "reportA1"
    | "whereA1"
    | "overseasA1"
    | "pickA1";
  a2:
    | "costA2"
    | "greyA2"
    | "marlaA2"
    | "sketchA2"
    | "boqA2"
    | "cdaSelfA2"
    | "formsA2"
    | "licensedA2"
    | "timingA2"
    | "papersA2"
    | "familyA2"
    | "cgiA2"
    | "reportA2"
    | "whereA2"
    | "overseasA2"
    | "pickA2";
  links: readonly FaqHref[];
};

export const faqItems = [
  { id: "cost", q: "costQ", a1: "costA1", a2: "costA2", links: ["/houses", "/build", "/contact"] },
  { id: "grey", q: "greyQ", a1: "greyA1", a2: "greyA2", links: ["/build"] },
  { id: "marla", q: "marlaQ", a1: "marlaA1", a2: "marlaA2", links: ["/houses"] },
  { id: "sketch", q: "sketchQ", a1: "sketchA1", a2: "sketchA2", links: ["/sketch", "/houses"] },
  { id: "boq", q: "boqQ", a1: "boqA1", a2: "boqA2", links: ["/build", "/contact"] },
  { id: "cdaSelf", q: "cdaSelfQ", a1: "cdaSelfA1", a2: "cdaSelfA2", links: ["/approvals"] },
  { id: "forms", q: "formsQ", a1: "formsA1", a2: "formsA2", links: ["/approvals"] },
  { id: "licensed", q: "licensedQ", a1: "licensedA1", a2: "licensedA2", links: ["/approvals", "/studio"] },
  { id: "timing", q: "timingQ", a1: "timingA1", a2: "timingA2", links: ["/approvals"] },
  { id: "papers", q: "papersQ", a1: "papersA1", a2: "papersA2", links: ["/approvals", "/contact"] },
  { id: "family", q: "familyQ", a1: "familyA1", a2: "familyA2", links: ["/houses", "/work"] },
  { id: "cgi", q: "cgiQ", a1: "cgiA1", a2: "cgiA2", links: ["/build", "/work"] },
  { id: "report", q: "reportQ", a1: "reportA1", a2: "reportA2", links: ["/build"] },
  { id: "where", q: "whereQ", a1: "whereA1", a2: "whereA2", links: ["/work", "/contact"] },
  { id: "overseas", q: "overseasQ", a1: "overseasA1", a2: "overseasA2", links: ["/contact"] },
  { id: "pick", q: "pickQ", a1: "pickA1", a2: "pickA2", links: ["/houses", "/build", "/contact"] },
] as const satisfies readonly FaqCopy[];

export const faqLinkLabel: Record<
  FaqHref,
  "houses" | "build" | "approvals" | "work" | "contact" | "studio" | "interiors" | "sketch"
> = {
  "/houses": "houses",
  "/build": "build",
  "/approvals": "approvals",
  "/work": "work",
  "/contact": "contact",
  "/studio": "studio",
  "/interiors": "interiors",
  "/sketch": "sketch",
};
