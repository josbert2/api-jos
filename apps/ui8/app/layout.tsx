import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UI8 · Design Assets & Templates",
  description:
    "Discover and download premium UI kits, templates, and design assets for your projects.",
  openGraph: {
    title: "UI8 · Design Assets & Templates",
    description:
      "Discover and download premium UI kits, templates, and design assets for your projects.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#141414] text-[#f5f5f5]">{children}</body>
    </html>
  );
}
