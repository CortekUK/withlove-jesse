export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Withlove, Jesse.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl text-sand-800 mb-8">Privacy policy</h1>
      <div className="prose prose-sand max-w-none text-sand-600 space-y-6">
        <p>
          We respect your privacy and are committed to protecting your personal
          data. This policy explains how we collect, use, and store your
          information when you use our website.
        </p>
        <p>
          We collect the information you provide when placing an order:
          name, email, address, and the personalisation details for your cards.
          We use this only to fulfil your order and communicate with you about
          it.
        </p>
        <p>
          We do not sell or share your data with third parties for marketing
          purposes. We may use your email to send order confirmations and, if
          you have opted in, our newsletter.
        </p>
      </div>
    </div>
  );
}
