import Providers from "@/components/Providers";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatPDF",
  description: "An AI application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>
          <Providers>
            <Toaster />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
