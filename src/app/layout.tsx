import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarkShot",
  description: "MarkShot",
};

export default function RootLayout({children }: Readonly<{children: React.ReactNode }>) {
  return (
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body>
          <main className="h-[100vh]">
            {/* <header className="py-2 pl-4 md:pl-6 pr-4 border-b flex flex-wrap gap-4 items-center justify-between w-full max-w-[2250px] mx-auto">
              <div className="flex gap-2 items-center">
                <Image src={icon} alt="Main Icon" width={40} height={40} />
                <h1 className="text-base-content text-lg font-bold">MarkShot</h1>
              </div>
              <div>
                <Button>
                  <Link href="/selectoption">
                    Get Started
                  </Link>
                </Button>
              </div>
            </header> */}
            {/* <div className="px-8 pb-6"> */}
              {children}
            {/* </div> */}
          </main>
        </body>
      </html>
  );
}
