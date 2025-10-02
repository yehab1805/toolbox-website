import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import HydrationFix from "@/components/hydration-fix";
import PageLoading from "@/components/page-loading";
import NavigationFeedback from "@/components/navigation-feedback";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: {
    default: "ToolBox - All-in-One Digital Toolbox",
    template: "%s | ToolBox"
  },
  description: "Access 25+ free online tools for studying, business, file management, and daily tasks. No registration required, no hidden costs.",
  keywords: "online tools, free tools, productivity, study tools, business tools, file tools, PDF tools, calculators, converters",
  authors: [{ name: "ToolBox Team" }],
  creator: "ToolBox Team",
  publisher: "ToolBox",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolbox-website.vercel.app",
    siteName: "ToolBox",
    title: "ToolBox - All-in-One Digital Toolbox",
    description: "Access 25+ free online tools for studying, business, file management, and daily tasks. No registration required, no hidden costs.",
    images: [
      {
        url: "https://toolbox-website.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolBox - All-in-One Digital Toolbox",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolBox - All-in-One Digital Toolbox",
    description: "Access 25+ free online tools for studying, business, file management, and daily tasks. No registration required, no hidden costs.",
    images: ["https://toolbox-website.vercel.app/og-image.png"],
    creator: "@toolbox",
  },
  alternates: {
    canonical: "https://toolbox-website.vercel.app",
  },
  verification: {
    google: "v5rMQ660SvQQn4kl4Jk8X-gFg7iGLUV0maUqobQF6TU",
    other: {
      "msvalidate.01": "BC2195EA81FA603C6716F2744C02E696",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2347690342335084"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent hydration mismatches from browser extensions
              (function() {
                if (typeof window !== 'undefined') {
                  const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                      if (mutation.type === 'attributes' && mutation.target === document.body) {
                        const attr = mutation.attributeName;
                        if (attr && (attr.startsWith('data-gr-') || attr.startsWith('data-new-gr-'))) {
                          document.body.removeAttribute(attr);
                        }
                      }
                    });
                  });
                  observer.observe(document.body, { attributes: true });
                }
              })();
            `,
          }}
        />
      </head>
      <body 
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HydrationFix />
          <PageLoading />
          <NavigationFeedback />
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
