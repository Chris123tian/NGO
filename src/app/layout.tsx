import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "HopeReach Ghana Foundation | Humanitarian NGO in Northern Ghana",
  description: "Official platform of HopeReach Ghana Foundation. Supporting underprivileged children, needy families, orphans, students, and deprived communities across Northern Ghana with food, clothing, and education.",
  keywords: [
    "NGO Ghana",
    "charity organization Ghana",
    "charity in Northern Ghana",
    "help children Ghana",
    "support deprived communities Ghana",
    "orphan support Ghana",
    "education charity Ghana",
    "food donation Ghana",
    "community development Ghana",
    "Tamale charity",
    "Bolgatanga NGO",
    "Wa NGO"
  ],
  authors: [{ name: "HopeReach Ghana Foundation" }],
  openGraph: {
    title: "HopeReach Ghana Foundation - Giving Hope in Northern Ghana",
    description: "Empowering underprivileged children, students, and families in Northern Ghana.",
    url: "https://hopereachghana.org",
    siteName: "HopeReach Ghana Foundation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
