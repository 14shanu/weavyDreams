import { NextResponse } from "next/server";
import data from '@/data/events.json'

export async function GET() {
    return NextResponse.json(data)
}