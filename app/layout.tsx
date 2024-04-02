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

export const metadata: Metadata = {
  title: "Vault",
  description: "Share secrets securely.",
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
          <header className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link href="/" className="font-mono font-semibold">
                vault
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

          <main className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
            {children}
          </main>

          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  )
}
