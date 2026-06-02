import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ciel.byronwade.com"),
  title: {
    default: "Ciel — Deploy without surprise bills",
    template: "%s · Ciel",
  },
  description:
    "Frontend-first deployment platform with predictable costs, understandable security, and legible deployment states.",
  applicationName: "Ciel",
  keywords: [
    "deployment platform",
    "preview deployments",
    "predictable hosting costs",
    "frontend hosting",
    "custom domains",
    "preview protection",
    "edge network",
  ],
  authors: [{ name: "Ciel" }],
  openGraph: {
    type: "website",
    siteName: "Ciel",
    title: "Ciel — Deploy without surprise bills",
    description:
      "Predictable costs, understandable security, and legible deployment states.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ciel — Deploy without surprise bills",
    description:
      "Predictable costs, understandable security, and legible deployment states.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
