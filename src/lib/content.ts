import { prisma } from "@/lib/prisma";

export async function getContentBlock(key: string): Promise<string | null> {
  try {
    const block = await prisma.editableContentBlock.findUnique({
      where: { key },
    });
    return block?.content?.trim() || null;
  } catch {
    return null;
  }
}
