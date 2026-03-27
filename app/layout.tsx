import type { Metadata } from "next";
import "./styles/base/reset/reset.scss";
import Menu from "./components/menu";
import Footer from "./components/footer";
import { metaDataWebsite } from "@/data/metadata";

export const metadata: Metadata = metaDataWebsite;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Menu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
