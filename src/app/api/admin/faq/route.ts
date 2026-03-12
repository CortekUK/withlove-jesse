import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const faqs = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(faqs);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { question, answer, sortOrder } = body;
  if (!question || !answer) {
    return NextResponse.json(
      { error: "Question and answer required" },
      { status: 400 }
    );
  }
  const faq = await prisma.faq.create({
    data: {
      question,
      answer,
      sortOrder: sortOrder ?? 0,
    },
  });
  return NextResponse.json(faq);
}
