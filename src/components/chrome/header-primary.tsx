"use client";

import { usePathname } from "@/i18n/navigation";

export function HeaderPrimary({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/coming-soon") return null;
  return <div className="contents">{children}</div>;
}
