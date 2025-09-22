"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const excludedPaths = ["/"];
  const showNavbar = !excludedPaths.includes(pathname);
  const showFooter = !excludedPaths.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar /> }
      {children}
      {showFooter && <Footer />}
    </>
  );
}
