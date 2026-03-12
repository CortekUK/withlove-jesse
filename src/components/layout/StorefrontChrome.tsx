"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

type StorefrontChromeProps = {
  children: React.ReactNode;
  headerLinks: { href: string; label: string }[];
  footerLinks: { href: string; label: string }[];
  siteTitle: string;
  announcementContent: string | null;
};

export function StorefrontChrome({
  children,
  headerLinks,
  footerLinks,
  siteTitle,
  announcementContent,
}: StorefrontChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {announcementContent && (
        <div className="bg-premium-brown text-white text-center py-2.5 px-4 text-sm">
          {announcementContent}
        </div>
      )}
      <Header links={headerLinks} siteTitle={siteTitle} />
      <main className="flex-1">{children}</main>
      <Footer links={footerLinks} siteTitle={siteTitle} />
    </>
  );
}
