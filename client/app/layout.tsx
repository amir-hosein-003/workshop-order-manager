import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/providers/ToastProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import QueryProvider from "@/components/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workshop Order Management",
  description: "Manage your workshop orders efficiently and effortlessly.",
  keywords: ["workshop", "order management", "inventory", "sales", "customers"],
  openGraph: {
    title: "Workshop Order Management",
    description: "Manage your workshop orders efficiently and effortlessly.",
    siteName: "Workshop Order Management",
    url: "https://workshop-order-management.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workshop Order Management",
    description: "Manage your workshop orders efficiently and effortlessly.",
    creator: "@yourTwitterId",
    images: ["https://workshop-order-management.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <QueryProvider>
            <ToastProvider />
            {children}
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
