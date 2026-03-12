import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CartContents } from "@/components/cart/CartContents";

export const metadata = {
  title: "Your Cart",
  description: "Review your personalised cards and proceed to checkout.",
};

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl text-sand-800 mb-8">Your cart</h1>
      <CartContents />
      <div className="mt-8">
        <Button asChild variant="outline">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}
