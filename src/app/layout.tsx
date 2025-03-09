import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import GridBackground from "@/components/GridBackground";
import ConvexClientProvider from "@/components/ConvexClientProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "No More Calls | AI Receptionist",
  description:
    "Let AI answer, schedule, and handle customer calls so you don't have to.",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        url: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: {
      url: "/icon.png",
      sizes: "192x192",
      type: "image/png",
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
      <body className={poppins.className}>
        <GridBackground />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
