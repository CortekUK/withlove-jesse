import { getContentBlock } from "@/lib/content";

export const metadata = {
  title: "Delivery",
  description: "Delivery and shipping information for Withlove, Jesse.",
};

const FALLBACK =
  "<p>All our cards are made to order, so please allow 3–5 working days for production before dispatch.</p><p>UK orders are dispatched via Royal Mail. Standard delivery typically takes 2–3 working days after dispatch.</p><p>International delivery is available. Please contact us for a quote.</p>";

export default async function DeliveryPage() {
  const content = await getContentBlock("delivery_content");

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl text-sand-800 mb-8">Delivery</h1>
      <div
        className="prose prose-sand max-w-none text-sand-600"
        dangerouslySetInnerHTML={{
          __html: content || FALLBACK,
        }}
      />
    </div>
  );
}
