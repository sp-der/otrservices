import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OTR Services | Built Different. Built for Business.",
  description:
    "OTR Services builds custom websites, manages digital experiences, and develops brands for businesses that refuse to look generic.",
  metadataBase: new URL("https://otrservices.com"),
  openGraph: {
    title: "OTR Services",
    description:
      "Websites, management, design, and brand support built around your business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
