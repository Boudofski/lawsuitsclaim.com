import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lawsuitsclaim.com"),
  title: {
    default: "LawsuitsClaim — Legal Claims Explained Clearly",
    template: "%s | LawsuitsClaim",
  },
  description:
    "Plain-English guides to lawsuits, settlements, injury claims, insurance disputes, consumer protection, and claim notices.",
  openGraph: {
    type: "website",
    siteName: "LawsuitsClaim",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://lawsuitsclaim.com" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen flex flex-col bg-surface font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
