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
  title: "ToolBox - All-in-One Digital Toolbox",
  description: "Access 25+ free online tools for studying, business, file management, and daily tasks. No registration required, no hidden costs.",
  keywords: "online tools, free tools, productivity, study tools, business tools, file tools",
  authors: [{ name: "ToolBox Team" }],
  openGraph: {
    title: "ToolBox - All-in-One Digital Toolbox",
    description: "Access 25+ free online tools for studying, business, file management, and daily tasks.",
    type: "website",
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
