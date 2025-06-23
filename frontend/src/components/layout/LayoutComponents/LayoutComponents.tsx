import type { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutComponents({ children }: LayoutProps) {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex flex-col lg:flex-row h-full my-5 mx-6 lg:mx-20 gap-6">{children}</div>
      <Footer />
    </div>
  );
}
