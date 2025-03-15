import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container } from "@/shared/ui";
import { Logo } from "@/shared/components";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Budget Tracker",
    template: "%s | Budget Tracker",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full ${inter.className} antialiased`}>
        <main className="h-full">
          <Container>
            <div className="h-full flex items-center justify-center">
              <div className="w-auth">
                <div className="mb-10 flex justify-center">
                  <Logo size="lg" />
                </div>
                {children}
              </div>
            </div>
          </Container>
        </main>
      </body>
    </html>
  );
}
