import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await prisma.siteSettings.findMany();
  const settings: Record<string, string> = {};
  for (const r of rows) settings[r.key] = r.value;
  return NextResponse.json(settings);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { key, value } = body;
  if (!key) return NextResponse.json({ error: "Key required" }, { status: 400 });

  await prisma.siteSettings.upsert({
    where: { key },
    update: { value: value ?? "" },
    create: { key, value: value ?? "" },
  });
  return NextResponse.json({ ok: true });
}
