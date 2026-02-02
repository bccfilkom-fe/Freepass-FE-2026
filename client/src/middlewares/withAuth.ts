import { useSession } from "@/hooks/useSesssion";
import { NextFetchEvent, NextProxy, NextRequest, NextResponse } from "next/server";

const adminOnlyPage = ["/admin"]
const barberOnlyPage = ["/barber"]
const customerOnlyPage = ["/profile", "/book"]

export default function withAuth(proxy: NextProxy) {
  return async (request: NextRequest, next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    const isAdminPage = adminOnlyPage.some(prefix => pathname.startsWith(prefix))
    const isBarberPage = barberOnlyPage.some(prefix => pathname.startsWith(prefix))
    const isCustomerPage = customerOnlyPage.some(prefix => pathname.startsWith(prefix))

    const user = useSession.getState().user

    const isIllegal =
      !!(user?.role === "CUSTOMER" && (isAdminPage || isBarberPage)) ||
      !!(user?.role === "BARBER" && (isAdminPage || isCustomerPage)) ||
      !!(user?.role === "ADMIN" && (isCustomerPage || isBarberPage)) ||
      !!(!user && (isAdminPage || isBarberPage || isCustomerPage))
    
    if (isIllegal) {
        const url = new URL("signin", request.url);
        url.searchParams.set("callbackUrl", encodeURI(request.url))

        return NextResponse.redirect(url)
    } else {
      return proxy(request, next)
    }
  };
}