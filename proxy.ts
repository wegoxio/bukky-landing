import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale, locales } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
