import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicRoutes, authRoutes, protectedRoutes } from "./app/router/routes";
import UserJwtTokenModel from "./app/models/user/UserJwtTokenModel";

export function middleware(request: NextRequest) {
  let trimPathname = request.nextUrl.pathname.substring(1);
  let cookieCurrentUser = request.cookies.get("currentUser")?.value;
  let currentUser: UserJwtTokenModel;

  if (request.nextUrl.pathname == "/" || trimPathname.match('^(?!(_next\/static|_next\/image|favicon\.ico|images)).*'))
  {
    if (!publicRoutes.includes(request.nextUrl.pathname)) {
      if (cookieCurrentUser && authRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL(publicRoutes[0], request.url)); 
      }
      else {
        if (cookieCurrentUser) {
          currentUser = UserJwtTokenModel.decodeString(cookieCurrentUser!)!;
          if (!protectedRoutes.hasAccess(request.nextUrl.pathname, currentUser.role)) {
            return NextResponse.redirect(new URL(publicRoutes[0], request.url)); 
          }
        }
      }
    }
  }
}