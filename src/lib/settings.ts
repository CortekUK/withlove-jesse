import { prisma } from "@/lib/prisma";

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteSettings.findMany();
    const out: Record<string, string> = {};
    for (const r of rows) out[r.key] = r.value;
    return out;
  } catch {
    return {};
  }
}

export async function getSiteSetting(key: string): Promise<string | null> {
  try {
    const row = await prisma.siteSettings.findUnique({
      where: { key },
    });
    return row?.value?.trim() || null;
  } catch {
    return null;
  }
}
