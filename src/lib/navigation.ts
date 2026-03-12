import { prisma } from "@/lib/prisma";

export async function getNavigation(
  location: "header" | "footer"
): Promise<{ href: string; label: string }[]> {
  try {
    const items = await prisma.navigationItem.findMany({
      where: { location },
      orderBy: { sortOrder: "asc" },
    });
    return items.map((item) => ({ href: item.href, label: item.label }));
  } catch {
    return [];
  }
}
