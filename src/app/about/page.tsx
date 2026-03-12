export const metadata = {
  title: "About",
  description: "Learn about Withlove, Jesse – personalised greeting cards made with care.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl text-sand-800 mb-8">About us</h1>
      <div className="prose prose-sand max-w-none text-sand-600 space-y-6">
        <p>
          Withlove, Jesse began with a simple idea: every card should feel
          personal. We believe that the best greetings come from the heart, and
          that a little thoughtfulness goes a long way.
        </p>
        <p>
          Our cards are designed for every occasion—birthdays, anniversaries,
          weddings, new babies, and all of life&apos;s milestones. Each one is made
          to order and personalised with your own words, so the people you love
          receive something truly special.
        </p>
        <p>
          We use quality materials and a clean, elegant aesthetic because we
          think your message deserves a beautiful home. From the moment you
          choose a card to the moment it arrives, we treat every step with care.
        </p>
        <p className="font-serif text-sand-800">
          Thank you for being here. We hope our cards help you say what matters
          most.
        </p>
      </div>
    </div>
  );
}
