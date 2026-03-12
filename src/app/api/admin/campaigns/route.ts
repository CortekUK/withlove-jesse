import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const campaigns = await prisma.seasonalCampaign.findMany({ orderBy: { homepageOrder: "asc" } });
  return NextResponse.json(campaigns);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name, slug, isActive, isFeatured, startsAt, endsAt, bannerTitle, bannerSubtitle, bannerCta, bannerImage, homepageOrder } = body;

  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const campaign = await prisma.seasonalCampaign.create({
    data: {
      name,
      slug: slug || slugify(name),
      isActive: !!isActive,
      isFeatured: !!isFeatured,
      startsAt: startsAt ? new Date(startsAt) : null,
      endsAt: endsAt ? new Date(endsAt) : null,
      bannerTitle: bannerTitle || null,
      bannerSubtitle: bannerSubtitle || null,
      bannerCta: bannerCta || null,
      bannerImage: bannerImage || null,
      homepageOrder: homepageOrder ?? 0,
    },
  });
  return NextResponse.json(campaign);
}
