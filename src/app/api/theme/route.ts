import { NextResponse } from "next/server";
import theme from "@/data/theme.json";

export async function GET() {
  return NextResponse.json(theme);
}
