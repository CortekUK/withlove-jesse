import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields required" },
      { status: 400 }
    );
  }

  // In production, integrate with email service (e.g. Resend, SendGrid)
  // For now, we just accept the submission
  return NextResponse.json({ ok: true });
}
