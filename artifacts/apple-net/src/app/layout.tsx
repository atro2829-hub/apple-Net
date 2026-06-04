import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1B7A3D" },
    { media: "(prefers-color-scheme: dark)", color: "#1B7A3D" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://applenet.app"),
  title: "Apple.NET - إدارة الهوت سبوت",
  description: "تطبيق إدارة الهوت سبوت الاحترافي - شراء كروت إنترنت وإدارة رصيدك بسهولة وأمان",
  manifest: "/manifest.json",
  applicationName: "Apple.NET",
  appleMobileWebAppTitle: "Apple.NET",
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Apple.NET",
  },
  openGraph: {
    title: "Apple.NET - إدارة الهوت سبوت",
    description: "تطبيق إدارة الهوت سبوت الاحترافي - شراء كروت إنترنت وإدارة رصيدك بسهولة وأمان",
    siteName: "Apple.NET",
    locale: "ar_YE",
    type: "website",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Apple.NET",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Apple.NET - إدارة الهوت سبوت",
    description: "تطبيق إدارة الهوت سبوت الاحترافي",
    images: ["/icons/icon-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Apple.NET" />
        <meta name="application-name" content="Apple.NET" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="msapplication-TileColor" content="#1B7A3D" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', { scope: '/' })
                    .then(function(registration) {
                      console.log('[App] SW registered:', registration.scope);
                      // Check for updates on load
                      registration.update();
                    })
                    .catch(function(err) {
                      console.warn('[App] SW registration failed:', err);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#ffffff",
              border: "1px solid #E8F5E9",
              color: "#1a1a1a",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              borderRadius: "16px",
              fontSize: "13px",
            },
          }}
        />
      </body>
    </html>
  );
}
