import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const adminOnlyPage = ["/admin"];
const barberOnlyPage = ["/barber"];
const customerOnlyPage = ["/profile", "/book"];

export default function withAuth(proxy: (request: NextRequest, next: NextFetchEvent) => NextResponse) {
  return async (request: NextRequest, next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    const isAdminPage = adminOnlyPage.some(prefix => pathname.startsWith(prefix))
    const isBarberPage = barberOnlyPage.some(prefix => pathname.startsWith(prefix))
    const isCustomerPage = customerOnlyPage.some(prefix => pathname.startsWith(prefix))

    const role = request.cookies.get("role")?.value

    const isIllegal =
      !!(role === "CUSTOMER" && (isAdminPage || isBarberPage)) ||
      !!(role === "BARBER" && (isAdminPage || isCustomerPage)) ||
      !!(role === "ADMIN" && (isCustomerPage || isBarberPage)) ||
      !!(!role && (isAdminPage || isBarberPage || isCustomerPage))
    
    if (isIllegal) {
        const url = new URL("signin", request.url);
        url.searchParams.set("callbackUrl", encodeURI(request.url))

        return NextResponse.redirect(url)
    } else {
      return proxy(request, next)
    }
  };
}