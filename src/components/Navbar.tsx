"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { PenLine, LogOut, UserCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/MobileMenu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    { href: "/upload-blog", label: "Post Blog" },
    { href: "/admin", label: "Admin" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#ead8c8] bg-[#fdf6f0]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#5c3d2e] text-white shadow-md shadow-[#5c3d2e]/20 transition group-hover:bg-[#c89666]">
            <PenLine className="h-5 w-5" />
          </div>

          <div className="leading-tight">
            <h1 className="text-lg font-extrabold tracking-tight text-[#5c3d2e] sm:text-xl">
              Romi.Blogs
            </h1>
            <p className="hidden text-xs font-medium text-[#8b5e3c] sm:block">
              Write. Share. Inspire.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-1">
              {session?.user ? (
                <>
                  {links.map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            isActive(link.href)
                              ? "bg-[#5c3d2e] text-white shadow-md shadow-[#5c3d2e]/20"
                              : "text-[#5c3d2e] hover:bg-[#fff4ea] hover:text-[#c89666]"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/"
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          isActive("/")
                            ? "bg-[#5c3d2e] text-white"
                            : "text-[#5c3d2e] hover:bg-[#fff4ea] hover:text-[#c89666]"
                        }`}
                      >
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/blogs"
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          isActive("/blogs")
                            ? "bg-[#5c3d2e] text-white"
                            : "text-[#5c3d2e] hover:bg-[#fff4ea] hover:text-[#c89666]"
                        }`}
                      >
                        Blogs
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Area */}
          {session?.user ? (
            <div className="flex items-center gap-3 border-l border-[#ead8c8] pl-5">
              <div className="hidden items-center gap-2 lg:flex">
                <UserCircle className="h-5 w-5 text-[#8b5e3c]" />
                <span className="max-w-[140px] truncate text-sm font-semibold text-[#5c3d2e]">
                  {session.user.name || "User"}
                </span>
              </div>

              <Button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="h-10 rounded-full bg-[#d7a86e] px-5 font-semibold text-white shadow-md shadow-[#d7a86e]/30 transition hover:bg-[#c89666]"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 border-l border-[#ead8c8] pl-5">
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#5c3d2e] transition hover:bg-[#fff4ea] hover:text-[#c89666]"
              >
                Login
              </Link>

              <Button
                asChild
                className="h-10 rounded-full bg-[#d7a86e] px-5 font-semibold text-white shadow-md shadow-[#d7a86e]/30 transition hover:bg-[#c89666]"
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}