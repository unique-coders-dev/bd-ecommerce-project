import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user;

  const isCustomerLogin = nextUrl.pathname === "/auth/login";
  const isAdminLogin = nextUrl.pathname === "/admin/login";
  const isRegister = nextUrl.pathname === "/auth/register";
  
  const isAdminPath = nextUrl.pathname.startsWith("/admin");
  const isCustomerPath = nextUrl.pathname.startsWith("/my-account");

  // 1. Allow Login/Register through for guests
  if (isCustomerLogin || isAdminLogin || isRegister) {
    if (isLoggedIn) {
      // If already logged in, send them to their dashboard
      if (isAdminLogin && (user?.role === "admin" || user?.role === "super-admin")) {
        return NextResponse.redirect(new URL("/admin", nextUrl));
      }
      return NextResponse.redirect(new URL("/my-account", nextUrl));
    }
    return NextResponse.next();
  }

  // 2. Protect Routes for Guests
  if (!isLoggedIn) {
    if (isAdminPath) {
      return NextResponse.redirect(new URL("/admin/login", nextUrl));
    }
    if (isCustomerPath) {
      return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }
    return NextResponse.next();
  }

  // 3. Authorization (Already Logged In)
  if (isAdminPath && !isAdminLogin) {
    if (user?.role !== "admin" && user?.role !== "super-admin") {
      // If a customer tries to get sneaky and enter /admin
      return NextResponse.redirect(new URL("/my-account", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/my-account/:path*", "/auth/login", "/admin/login"],
};
