import { ReactNode } from "react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function Layout({
  isSetup = false,
  footerOneliner = "",
  children,
}: {
  isSetup?: boolean;
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
      {(footerOneliner !== "" || isSetup) && (
        <Footer isSetup={isSetup} footerOneliner={footerOneliner} />
      )}
    </div>
  );
}
