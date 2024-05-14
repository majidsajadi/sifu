import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const dependencies = request.nextUrl.searchParams.getAll("dep");

  if (!dependencies.length) {
    return NextResponse.redirect(new URL("/upload", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
