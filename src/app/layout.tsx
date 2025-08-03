import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { getSession, isAdmin } from "@/lib/auth";
import { SignOutButton } from "@/components/auth/signout-button";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "My Blog",
  description: "Personal blog about programming and technology",
  alternates: {
    types: {
      "application/rss+xml": [
        {
          title: "RSS Feed",
          url: "/api/rss",
        },
      ],
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const isUserAdmin = session ? isAdmin(session.user.email) : false;

  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href="/api/rss"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        <nav className="p-6 border-b border-green-500/30 bg-black/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex space-x-6">
              <Link
                href="/"
                className="nav-link text-lg font-bold gradient-text"
              >
                <span className="mr-2">🚀</span>
                My Blog
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="nav-link flex items-center">
                <span className="mr-1">🏠</span>
                home
              </Link>
              <Link href="/blog" className="nav-link flex items-center">
                <span className="mr-1">📝</span>
                blog
              </Link>
              {session ? (
                <div className="flex items-center space-x-4">
                  {isUserAdmin && (
                    <Link href="/admin" className="nav-link flex items-center">
                      <span className="mr-1">⚙️</span>
                      admin
                    </Link>
                  )}
                  <Image
                    src={session.user.image || "/profile.png"}
                    alt={session.user.name || "Profile"}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full border-2 border-green-500/30 object-cover"
                  />
                  <SignOutButton />
                </div>
              ) : (
                <Link href="/login" className="nav-link flex items-center">
                  <span className="mr-1">🔐</span>
                  login
                </Link>
              )}
            </div>
          </div>
        </nav>
        <main className="flex-1 max-w-4xl mx-auto p-6 w-full">{children}</main>
        <Toaster />
        <footer className="p-6 border-t border-green-500/30 bg-black/50 backdrop-blur-sm mt-auto">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="text-sm">© 2024 Open Source</div>
            <div className="flex space-x-4">
              <a href="/rss" className="nav-link text-sm flex items-center">
                <span className="mr-1">📡</span>
                rss
              </a>
              <a
                href="https://github.com/Yaswanth1320"
                className="nav-link text-sm flex items-center"
              >
                <span className="mr-1">🐙</span>
                github
              </a>
              <a
                href="https://github.com/Yaswanth1320/blogs"
                className="nav-link text-sm flex items-center"
              >
                <span className="mr-1">👁️</span>
                view source
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
