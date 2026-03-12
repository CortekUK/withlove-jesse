import { getContentBlock } from "@/lib/content";

export const metadata = {
  title: "Returns",
  description: "Returns and refunds policy for Withlove, Jesse.",
};

const FALLBACK =
  "<p>Because our cards are personalised, we cannot offer returns unless the item is faulty or we have made an error.</p><p>If you receive a damaged or incorrect item, please contact us within 14 days.</p>";

export default async function ReturnsPage() {
  const content = await getContentBlock("returns_content");

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl text-sand-800 mb-8">Returns</h1>
      <div
        className="prose prose-sand max-w-none text-sand-600"
        dangerouslySetInnerHTML={{
          __html: content || FALLBACK,
        }}
      />
    </div>
  );
}
