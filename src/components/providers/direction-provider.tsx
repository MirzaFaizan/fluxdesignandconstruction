"use client";

import { DirectionProvider as DirectionPrimitive } from "@/components/ui/direction";

export function AppDirectionProvider({
  direction,
  children,
}: {
  direction: "ltr" | "rtl";
  children: React.ReactNode;
}) {
  return (
    <DirectionPrimitive direction={direction}>{children}</DirectionPrimitive>
  );
}
