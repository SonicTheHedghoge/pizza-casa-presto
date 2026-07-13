import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pizza Casa Presto — Les Meilleures Pizzas de Djerba 🍕",
  description:
    "Savourez les meilleures pizzas artisanales de Djerba à emporter ou en livraison rapide. Pizza Del Casa, Margherita, et créations exclusives à Houmt Souk.",
  keywords: ["Pizza", "Casa Presto", "Djerba", "Houmt Souk", "Pizzeria", "Tunisie"],
  authors: [{ name: "Pizza Casa Presto" }],
  metadataBase: new URL("https://pizza-casa-presto.vercel.app"),
  openGraph: {
    title: "Pizza Casa Presto — Les Meilleures Pizzas de Djerba 🍕",
    description: "Pizzas artisanales gourmandes. Houmt Souk Djerba.",
    url: "https://pizza-casa-presto.vercel.app",
    siteName: "Pizza Casa Presto",
    locale: "fr_TN",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Pizza Casa Presto Djerba" }],
  },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Just+Another+Hand&family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
