import type { Metadata } from "next";
import "./premium.css";
import PortfolioEmbeds from "./PortfolioEmbeds";

export const metadata: Metadata = {
  title: "OTR Services | On The Run",
  description:
    "OTR Services builds custom websites, manages digital experiences, and creates brand systems for businesses that want to stand out and keep moving.",
  metadataBase: new URL("https://otrservices.com"),
  openGraph: {
    title: "OTR Services | On The Run",
    description:
      "Custom websites, management, design, and creative support built to represent your business right.",
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
