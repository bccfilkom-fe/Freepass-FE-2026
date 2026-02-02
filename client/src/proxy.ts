import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export const mainProxy = (request: NextRequest) => {
  // const refreshToken = request.cookies.get("refreshToken")?.value;

  // if (!refreshToken) {
  //   const url = new URL("/home", request.url);
  //   const response = NextResponse.redirect(url);

  //   response.cookies.set("toast", "unauthorized", {
  //     path: "/",
  //     maxAge: 5,
  //   });

  //   return NextResponse.redirect(new URL("/login", request.url));
  // } else {
  //   return NextResponse.next();
  // }
  return NextResponse.next()
};

// export const config = {
//   matcher: "/:path*",
// };

export default withAuth(mainProxy)