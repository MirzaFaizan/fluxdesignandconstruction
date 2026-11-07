import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

function isLocalHost(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const hostname = host.split(":")[0]?.toLowerCase() ?? "";
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname === "::1" ||
    hostname === "[::1]"
  );
}

function holdHomeOnProduction(request: NextRequest) {
  // next dev and any localhost preview keep the real home.
  return process.env.NODE_ENV === "production" && !isLocalHost(request);
}

export default function proxy(request: NextRequest) {
  if (holdHomeOnProduction(request)) {
    const path = request.nextUrl.pathname;

    if (path === "/" || path === "") {
      const url = request.nextUrl.clone();
      url.pathname = "/coming-soon";
      return NextResponse.redirect(url, 307);
    }

    if (path === "/ur" || path === "/ur/") {
      const url = request.nextUrl.clone();
      url.pathname = "/ur/coming-soon";
      return NextResponse.redirect(url, 307);
    }
  }

  return handleI18n(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
