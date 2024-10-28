import type { Metadata } from "next";
import "./globals.css";
import { McLaren as Font } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { cn } from "@/lib/utils";
import HeaderWrapper from "./HeaderWrapper";
import { Toaster } from "@/components/ui/toaster";

const fontMono = Font({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(fontMono.className, "bg-white-950 antialiased")}>
          <HeaderWrapper userId={userId} />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
