import { getSiteSettings } from "@/lib/settings";
import { ContactForm } from "./ContactForm";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const intro =
    settings.contact_intro ||
    "We'd love to hear from you. Send us a message and we'll get back to you soon.";
  const email = settings.contact_email || "";
  const phone = settings.contact_phone || "";

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl text-sand-800 mb-2">Contact us</h1>
      <p className="text-sand-600 mb-4">{intro}</p>
      {(email || phone) && (
        <p className="text-sm text-sand-600 mb-10">
          {email && (
            <span>
              Email:{" "}
              <a
                href={`mailto:${email}`}
                className="text-premium-brown hover:underline"
              >
                {email}
              </a>
            </span>
          )}
          {email && phone && " · "}
          {phone && (
            <span>
              Phone:{" "}
              <a
                href={`tel:${phone}`}
                className="text-premium-brown hover:underline"
              >
                {phone}
              </a>
            </span>
          )}
        </p>
      )}
      <ContactForm />
    </div>
  );
}
