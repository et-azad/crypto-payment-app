import { ReactNode } from "react";
import Header from "@/components/layouts/gateway/Header";
import Footer from "@/components/layouts/gateway/Footer";

export default function Layout({
  footerOneliner = "",
  children,
}: {
  footerOneliner?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="p-4 py-24 flex items-center min-h-screen justify-center bg-white">
          {children}
        </section>
      </main>
      <Footer footerOneliner={footerOneliner} />
    </div>
  );
}
