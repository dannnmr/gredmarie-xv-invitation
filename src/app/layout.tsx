import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/core/SmoothScroll";
import { invitationConfig } from "@/config/invitation.config";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const pinyonScript = Pinyon_Script({
  weight: "400",
  variable: "--font-pinyon",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gredmarie-xv-invitation.danmr.com'),
  title: `${invitationConfig.client.name} - ${invitationConfig.client.eventType}`,
  description: invitationConfig.client.finalPhrase,
  openGraph: {
    images: [
      {
        url: "/invitation/metadata_gredmarie.webp",
        width: 1200,
        height: 630,
        alt: `${invitationConfig.client.name} - ${invitationConfig.client.eventType}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ["/invitation/metadata_gredmarie.webp"],
  },
  icons: {
    icon: "/invitation/broche_gredmarie.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable} ${pinyonScript.variable}`}>
      <body className="antialiased min-h-screen bg-theme-primary text-theme-secondary font-sans selection:bg-theme-accent selection:text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
