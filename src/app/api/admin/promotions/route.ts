import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const promotions = await prisma.promotion.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(promotions);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const {
    title,
    description,
    code,
    discountType,
    discountValue,
    startsAt,
    endsAt,
    isActive,
    bannerTitle,
    bannerSubtitle,
    bannerCta,
    bannerLink,
    bannerImage,
    location,
  } = body;

  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

  const promotion = await prisma.promotion.create({
    data: {
      title,
      description: description || null,
      code: code || null,
      discountType: discountType || "percentage",
      discountValue: discountValue ?? 0,
      startsAt: startsAt ? new Date(startsAt) : null,
      endsAt: endsAt ? new Date(endsAt) : null,
      isActive: isActive !== false,
      bannerTitle: bannerTitle || null,
      bannerSubtitle: bannerSubtitle || null,
      bannerCta: bannerCta || null,
      bannerLink: bannerLink || null,
      bannerImage: bannerImage || null,
      location: location || null,
    },
  });
  return NextResponse.json(promotion);
}
