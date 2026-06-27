"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu, X, LogOut, UserCircle, LogIn } from "lucide-react";

import { Button } from "./ui/button";
import { linkType } from "@/types/type";

function MobileMenu({ links }: { links: linkType[] }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e0c097] bg-white text-[#5c3d2e] shadow-sm transition hover:bg-[#fff4ea]"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-2xl border border-[#ead8c8] bg-white shadow-2xl shadow-[#5c3d2e]/10">
          {/* User Area */}
          <div className="border-b border-[#ead8c8] bg-[#fffaf6] px-4 py-4">
            {session?.user ? (
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5c3d2e] text-white">
                  <UserCircle className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#5c3d2e]">
                    {session.user.name || "User"}
                  </p>
                  <p className="truncate text-xs text-[#8b5e3c]">
                    {session.user.email || "Logged in"}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm font-bold text-[#5c3d2e]">
                  Welcome to Romi.Blogs
                </p>
                <p className="mt-1 text-xs text-[#8b5e3c]">
                  Login to post and manage blogs.
                </p>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="space-y-1 p-3">
            {session?.user ? (
              <>
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive(link.href)
                        ? "bg-[#5c3d2e] text-white shadow-md shadow-[#5c3d2e]/20"
                        : "text-[#5c3d2e] hover:bg-[#fff4ea] hover:text-[#c89666]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <Button
                  onClick={() => {
                    closeMenu();
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="mt-3 h-11 w-full rounded-xl bg-[#d7a86e] font-semibold text-white shadow-md shadow-[#d7a86e]/30 transition hover:bg-[#c89666]"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive("/")
                      ? "bg-[#5c3d2e] text-white"
                      : "text-[#5c3d2e] hover:bg-[#fff4ea] hover:text-[#c89666]"
                  }`}
                >
                  Home
                </Link>

                <Link
                  href="/blogs"
                  onClick={closeMenu}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive("/blogs")
                      ? "bg-[#5c3d2e] text-white"
                      : "text-[#5c3d2e] hover:bg-[#fff4ea] hover:text-[#c89666]"
                  }`}
                >
                  Blogs
                </Link>

                <Button
                  asChild
                  className="mt-3 h-11 w-full rounded-xl bg-[#d7a86e] font-semibold text-white shadow-md shadow-[#d7a86e]/30 transition hover:bg-[#c89666]"
                >
                  <Link href="/login" onClick={closeMenu}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;