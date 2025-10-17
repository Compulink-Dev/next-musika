// MainLayout.tsx
import React from "react";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full  ">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
