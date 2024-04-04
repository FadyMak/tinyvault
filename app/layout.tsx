import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs"

import "./globals.css"

import type { Metadata } from "next"
import Link from "next/link"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from '@vercel/analytics/react';
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "tinyvault | Share secrets securely.",
  description: "A simple and secure way to share secrets with people you trust.",
}

// all child pages and actions will run on the edge
export const runtime = "edge"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <ClerkProvider>
        <body className="min-h-screen bg-background font-sans antialiased">
          <header className="py-8 mx-auto max-w-4xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="font-mono font-semibold">
                tinyvault
              </Link>
              <div>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline">Log In</Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>

          <main className="mx-auto min-h-[calc(100svh-220px)] max-w-4xl mb-8">
            {children}
          </main>

          <Separator />

          <footer className="mx-auto max-w-4xl py-8">
            <Link href="/privacy" className="text-sm">Privacy Policy</Link>
          </footer>

          <Toaster />

          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  )
}
