import "@/_styles/global.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import ReservationProvider from "./_components/ReservationContext";
import ToasterProvider from "./_components/ToasterProvider";
import { Suspense } from "react";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / 云栖酒店",
    default: "欢迎 / 云栖酒店",
  },
  description: "云栖酒店是一处栖息于山间的隐逸胜地",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 h-screen grid grid-rows-[auto_1fr]`}
      >
        <Suspense fallback={<div className="h-10 bg-primary-900" />}>
          <Header />
        </Suspense>
        <div className="flex-1 px-8 py-12 grid-row-2/3 overflow-y-auto">
          <main className="max-w-7xl mx-auto">
            <ToasterProvider>
              <ReservationProvider>{children}</ReservationProvider>
            </ToasterProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
