import type { Metadata } from "next";
import "./globals.css";
import "./fixes.css";
import PortfolioEmbeds from "./PortfolioEmbeds";

export const metadata: Metadata = {
  title: "OTR Services | Built to Represent Your Business Right.",
  description:
    "OTR Services builds custom websites, manages digital experiences, and develops brands for businesses that want to represent themselves right.",
  metadataBase: new URL("https://otrservices.com"),
  openGraph: {
    title: "OTR Services",
    description:
      "Websites, management, design, and brand support built to represent your business right.",
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
      <body>
        {children}
        <PortfolioEmbeds />
      </body>
    </html>
  );
}
