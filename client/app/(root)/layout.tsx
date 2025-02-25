import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/shared/components";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Budget Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-full ${inter.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
