import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export const mainProxy = (request: NextRequest) => {
  return NextResponse.next()
};

export default withAuth(mainProxy)