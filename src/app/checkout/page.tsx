import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Checkout",
  description: "Complete your order with Withlove, Jesse.",
};

export default function CheckoutPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl text-sand-800 mb-8">Checkout</h1>
      <div className="p-6 rounded-xl border border-sand-200 bg-cream-50 mb-8">
        <p className="text-sand-600 mb-4">
          Checkout is ready for integration. Connect your Stripe account and
          add your keys to the environment variables to enable payments.
        </p>
        <p className="text-sm text-sand-500">
          The order flow, cart, and checkout structure are in place. Add Stripe
          Checkout or Elements when you&apos;re ready to go live.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link href="/cart">Back to cart</Link>
      </Button>
    </div>
  );
}
