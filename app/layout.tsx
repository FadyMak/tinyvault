import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs"

import "./globals.css"

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Analytics } from "@vercel/analytics/react"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "tinyvault | Share secrets securely.",
  description:
    "A simple and secure way to share secrets with people you trust.",
}

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
          <header className="mx-auto max-w-4xl px-4 py-8">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Image
                  width={36}
                  height={36}
                  src="/logo.png"
                  alt="tinyvault logo"
                />
              </Link>
              <div>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline">Log In</Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "size-8",
                      },
                    }}
                  />
                </SignedIn>
              </div>
            </div>
          </header>

          <main className="mx-auto mb-8 min-h-[calc(100svh-220px)] max-w-4xl px-4">
            {children}
          </main>

          <Separator />

          <footer className="mx-auto max-w-4xl justify-between space-y-4 px-4 py-8 sm:flex sm:space-y-0">
            <div>
              <Link href="/" className="font-mono font-semibold">
                tinyvault
              </Link>
              <span className="font-mono text-muted-foreground">
                {" "}
                | Share secrets securely.
              </span>
            </div>

            <div className="space-x-4">
              <Link href="/privacy" className="text-sm">
                Privacy
              </Link>

              <Link
                href="https://github.com/fadymak/tinyvault"
                className="text-sm"
              >
                Source
              </Link>
            </div>
          </footer>

          <Toaster />

          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  )
}
