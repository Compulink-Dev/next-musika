"use client";
import React, { useState } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const NavbarItem = ({ children, href, isActive, onClick }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent shadow-none px-4 text-base transition-all duration-200",
        isActive && "bg-black text-white hover:bg-zinc-800 hover:text-white"
      )}
      onClick={onClick}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const MobileNavbarItem = ({
  children,
  href,
  isActive,
  onClick,
}: NavbarItemProps) => {
  return (
    <SheetClose asChild>
      <Button
        asChild
        variant={"ghost"}
        className={cn(
          "w-full justify-start text-lg py-6 px-4 hover:bg-gray-100 transition-colors duration-200",
          isActive && "bg-gray-100 text-black font-semibold"
        )}
        onClick={onClick}
      >
        <Link href={href}>{children}</Link>
      </Button>
    </SheetClose>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

function Navbar() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavItemClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="h-20 flex border-b justify-between items-center font-medium bg-white sticky top-0 z-50 px-4 lg:px-6">
      {/* Logo */}
      <Link href={"/"} className="flex items-center">
        <p className={cn("text-3xl font-semibold", poppins.className)}>
          Musika.
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className="items-center gap-2 hidden lg:flex h-full">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathName === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}

        {/* Auth Buttons - Full Height */}
        <div className="flex items-stretch h-full gap-0 ml-4">
          <Button
            asChild
            variant="ghost"
            className="h-full rounded-none px-6 hover:bg-gray-50 transition-colors duration-200"
          >
            <Link href={"/login"}>Log in</Link>
          </Button>
          <Button
            asChild
            className="h-full rounded-none px-6 bg-black text-white hover:bg-zinc-800 transition-colors duration-200"
          >
            <Link href={"/signup"}>Start selling</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <Link href={"/"} onClick={() => setIsOpen(false)}>
                  <p
                    className={cn("text-2xl font-semibold", poppins.className)}
                  >
                    Musika.
                  </p>
                </Link>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 py-4">
                {navbarItems.map((item) => (
                  <MobileNavbarItem
                    key={item.href}
                    href={item.href}
                    isActive={pathName === item.href}
                    onClick={handleNavItemClick}
                  >
                    {item.children}
                  </MobileNavbarItem>
                ))}
              </div>

              {/* Auth Buttons in Mobile Menu */}
              <div className="p-4 border-t space-y-3">
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full py-6 text-lg"
                    onClick={handleNavItemClick}
                  >
                    <Link href={"/login"}>Log in</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full py-6 text-lg bg-black text-white hover:bg-zinc-800"
                    onClick={handleNavItemClick}
                  >
                    <Link href={"/signup"}>Start selling</Link>
                  </Button>
                </SheetClose>
              </div>

              {/* Footer */}
              <div className="p-6 border-t">
                <p className="text-sm text-gray-500 text-center">
                  Your Music Journey Starts Here
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default Navbar;
