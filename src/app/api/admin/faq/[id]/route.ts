import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { question, answer, sortOrder } = body;
  const faq = await prisma.faq.update({
    where: { id: params.id },
    data: {
      ...(question !== undefined && { question }),
      ...(answer !== undefined && { answer }),
      ...(sortOrder !== undefined && { sortOrder }),
    },
  });
  return NextResponse.json(faq);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await prisma.faq.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
