import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server'

// hilangkan test
const protectedRoutes = ['/categories', '/movements', '/product', '/test']

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const session = cookieStore.get("session_token");

  if (!session && protectedRoutes.includes(pathname)) return NextResponse.redirect(new URL('/', request.nextUrl));
  if (session && !protectedRoutes.includes(pathname)) return NextResponse.redirect(new URL('/product', request.nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}