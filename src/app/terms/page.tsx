export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Withlove, Jesse.",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl text-sand-800 mb-8">
        Terms & conditions
      </h1>
      <div className="prose prose-sand max-w-none text-sand-600 space-y-6">
        <p>
          By using this website and placing orders, you agree to these terms.
        </p>
        <p>
          All products are subject to availability. We reserve the right to
          refuse orders at our discretion. Prices are correct at the time of
          publication but may change.
        </p>
        <p>
          Personalisation is the responsibility of the customer. Please check
          all details before confirming your order.
        </p>
      </div>
    </div>
  );
}
