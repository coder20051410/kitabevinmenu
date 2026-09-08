import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/lib/site";
import Providers from "@/components/Providers";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kitabevin-bookcafe.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kitab Evin Bookcafe | QR Menyu",
  description:
    "Kitab Evin Bookcafe — kofe, kitab və rahatlıq bir məkanda. Binə qəsəbəsi, Fuad Aynulov 4 küçəsi.",
  keywords: [
    "Kitab Evin",
    "Bookcafe",
    "Bakı kafe",
    "Binə",
    "QR menyu",
    "kofe",
    "kitab kafe",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kitab Evin Bookcafe",
  },
  openGraph: {
    title: "Kitab Evin Bookcafe | QR Menyu",
    description:
      "Kofe, Kitab, Rahatlıq bir məkanda — @kitabevin_bookcafe",
    type: "website",
    locale: "az_AZ",
    siteName: siteConfig.name,
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Kitab Evin Bookcafe",
      },
      {
        url: `${siteUrl}/logo.png`,
        width: 500,
        height: 500,
        alt: "Kitab Evin Bookcafe Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitab Evin Bookcafe | QR Menyu",
    description:
      "Kofe, Kitab, Rahatlıq bir məkanda — @kitabevin_bookcafe",
    images: [`${siteUrl}/og-image.png`, `${siteUrl}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var isDark = theme === 'dark';
                  if (isDark) document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${playfair.variable} ${manrope.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
