import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Footer, Header, Toast } from "@/components";
import SearchProductsQueryParamsProvider from "@/contexts/useSearchProductsQueryParamsContext";
import ReactQueryClientProvider from "@/providers/QueryClientProvider";
import AppProgressBarProvider from "@/providers/AppProgressBarProvider";

const jost = Jost({ subsets: ["latin"], variable: '--font-jost', });

export const metadata: Metadata = {
  title: "lots of stuff: your all in one shopping destination",
  description: "We've got lots of stuff. You should probably buy some - 😉.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <SearchProductsQueryParamsProvider>
        <html lang="en">
          <body className={`${jost.className} min-h-screen max-w-[1200px] xl:w-5/6 px-4 lg:px-6 mx-auto flex flex-col`}>
            <AppProgressBarProvider>
              <Toast />

              <Header />
              <div className="pb-24">
                {children}
              </div>
              <Footer />
            </AppProgressBarProvider>
          </body>
        </html>
      </SearchProductsQueryParamsProvider>
    </ReactQueryClientProvider>
  );
}
