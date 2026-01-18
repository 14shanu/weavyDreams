// import { NextResponse } from "next/server";
// import { Resend } from "resend";


// const resend = new Resend(process.env.RESEND_API_KEY);
// export async function POST(request: Request) {
//     const body = await request.json().catch(() => null);

//     if (!body || !body.name || !body.email || !body.message) {
//         return NextResponse.json(
//             { ok: false, error: "Missing required fields" },
//             { status: 400 }
//         );
//     }

//     // Mock behavior: log in dev
//     // if (process.env.NODE_ENV !== "production") {
//     //     console.log("Contact form submission:", body);
//     // }

//     // Here you would call real email service / CRM / backend.
//     const { name, email, phone, company, message } = body;

//     const toEmail = process.env.CONTACT_TO_EMAIL;
//     const fromEmail = process.env.CONTACT_FROM_EMAIL;
//     if (!toEmail || !fromEmail) {
//         return NextResponse.json(
//             { ok: false, error: "Contact email is not configured" },
//             { status: 500 }
//         );
//     }

//     try {
//         const subject = `New enquiry from ${name}`;
//         const html = `
//       <h2>New enquiry from website</h2>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Phone:</strong> ${phone || "-"}</p>
//       <p><strong>Company:</strong> ${company || "-"}</p>
//       <p><strong>Message:</strong></p>
//       <p>${message.replace(/\n/g, "<br />")}</p>
//     `;


//         await resend.emails.send({
//             from: fromEmail,
//             to: toEmail,
//             subject,
//             html
//         })

//         return NextResponse.json({ ok: true });
//     } catch (error) {
//         console.error("Error sending contact email:", error);
//         return NextResponse.json(
//             { ok: false, error: "Failed to send email" },
//             { status: 500 }
//         );
//     }
// }
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);

    if (!body || !body.name || !body.email || !body.message) {
        return NextResponse.json(
            { ok: false, error: "Missing required fields" },
            { status: 400 }
        );
    }

    const { name, email, phone, company, message } = body;

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;

    if (!toEmail || !fromEmail) {
        return NextResponse.json(
            { ok: false, error: "Contact email is not configured" },
            { status: 500 }
        );
    }

    if (!apiKey) {
        return NextResponse.json(
            { ok: false, error: "Resend API key is not configured" },
            { status: 500 }
        );
    }

    try {
        const resend = new Resend(apiKey);
        const subject = `New enquiry from ${name}`;
        const html = `
      <h2>New enquiry from website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "-"}</p>
      <p><strong>Company:</strong> ${company || "-"}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

        const result = await resend.emails.send({
            from: fromEmail,
            to: toEmail,
            subject,
            html
        });

        if (result.error) {
            console.error("Resend error:", result.error);
            return NextResponse.json(
                { ok: false, error: result.error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Error sending contact email:", error);
        return NextResponse.json(
            { ok: false, error: "Failed to send email" },
            { status: 500 }
        );
    }
}

