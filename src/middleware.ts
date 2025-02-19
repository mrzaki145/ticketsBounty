import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import { type Session } from "./features/auth/types";
import { signInPath } from "./path";

export default async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  if (!session)
    return NextResponse.redirect(new URL(signInPath(), request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/tickets", "/tickets/:path*/edit", "/profile"],
};
