import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, STIX_Two_Text } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClerkUserSync from "@/components/ConvexClerkUserSync";
import Header from "@/components/header/header";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const stixTwoText = STIX_Two_Text({
  variable: "--font-stix-two-text",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Selbekk Labs",
    template: "%s | Selbekk Labs",
  },
  description:
    "We develop applications that drive results and help your Business grow. No BS. Just Results.",
  // icons: {
  //   icon: "/favicon.svg",
  // },
  keywords: [
    "Web Development",
    "Web Applications",
    "Web Design",
    "Web Development Agency",
    "Web Development Company",
    "Web Development Services",
    "Software Development",
    "AI Development",
    "AI Products",
    "Morgan Selbekk",
    "Selbekk",
  ],
  authors: [{ name: "Morgan Selbekk" }],
  creator: "Morgan Selbekk",
  publisher: "Morgan Selbekk",

  metadataBase: new URL("https://www.selbekk.dev"),

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.selbekk.dev",
    title: "Selbekk Labs",
    description:
      "We develop applications that drive results and help your Business grow. No BS. Just Results.",
    siteName: "Selbekk Labs",
    images: [
      {
        url: "https://www.selbekk.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Selbekk Labs",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Selbekk Labs",
    description:
      "We develop applications that drive results and help your Business grow. No BS. Just Results.",
    creator: "@mselbekk1",
    images: ["https://www.selbekk.dev/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "eHlquJ631zz_IvEw19K8S5UdbHhVtw891-TPvbQMb_w",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth!">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${stixTwoText.variable} ${inter.variable} antialiased`}
      >
        <ClerkProvider dynamic>
          <ConvexClientProvider>
            <ConvexClerkUserSync />
            <Header />
            <main className="pt-16 relative z-10">
              {children}
              <Analytics />
            </main>
          </ConvexClientProvider>
        </ClerkProvider>
        <script
          src="https://www.sensai.co/widget/embed.js"
          data-chatbot-id="jh71vy147ek2swsm0vxr7c1p1985jv31"
          async
        ></script>
      </body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <Script
        src="https://datafa.st/js/script.js"
        data-website-id="dfid_tuTCcAxTFcm8mjoqo01Yr"
        data-domain="www.selbekk.dev"
        strategy="afterInteractive"
      />
    </html>
  );
}
