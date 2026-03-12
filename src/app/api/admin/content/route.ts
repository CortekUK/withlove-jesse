import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { key, content } = body;
  if (!key) return NextResponse.json({ error: "Key required" }, { status: 400 });

  const block = await prisma.editableContentBlock.upsert({
    where: { key },
    update: { content: content ?? "" },
    create: { key, content: content ?? "" },
  });
  return NextResponse.json(block);
}
