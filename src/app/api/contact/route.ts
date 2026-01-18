import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);

    if (!body || !body.name || !body.email || !body.message) {
        return NextResponse.json(
            { ok: false, error: "Missing required fields" },
            { status: 400 }
        );
    }

    // Mock behavior: log in dev
    if (process.env.NODE_ENV !== "production") {
        console.log("Contact form submission:", body);
    }

    // Here you would call real email service / CRM / backend.

    return NextResponse.json({ ok: true });
}