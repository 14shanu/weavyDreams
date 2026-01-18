// import { NextResponse } from "next/server";
// import home from "@/data/pages/home.json";

// const pages: Record<string, any> = {
//   home
// };

// export async function GET(
//   request: Request,
//   { params }: { params: { page: string } }
// ) {
//   const page = pages[params.page];

//   if (!page) {
//     return NextResponse.json({ error: "Not found" }, { status: 404 });
//   }

//   return NextResponse.json(page);
// }
import { NextResponse } from "next/server";
import home from "@/data/pages/home.json";

const pages: Record<string, unknown> = {
  home
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  const { page: pageSlug } = await params;
  const page = pages[pageSlug];

  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(page);
}
