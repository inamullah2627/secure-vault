import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getPublishedPost } from "@/content/blog-posts";

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/").filter(Boolean)[1];
  if (!slug || getPublishedPost(slug)) return NextResponse.next();
  return NextResponse.redirect(new URL("/404", request.url));
}

export const config = {
  matcher: "/blog/:slug",
};
