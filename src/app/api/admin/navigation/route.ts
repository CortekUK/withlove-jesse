import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await prisma.navigationItem.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { label, href, sortOrder, location } = body;
  if (!label || !href || !location) {
    return NextResponse.json({ error: "Label, href, and location required" }, { status: 400 });
  }

  const item = await prisma.navigationItem.create({
    data: { label, href, sortOrder: sortOrder ?? 0, location },
  });
  return NextResponse.json(item);
}
