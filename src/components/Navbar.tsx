"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/MobileMenu";
export default function Navbar() {
  const { data: session } = useSession();

  const links  = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    { href: "/upload-blog", label: "Post Blog" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className="bg-[#fdf6f0] border-b border-[#e0c097]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-[#5c3d2e] text-xl font-bold">Romi.Blogs</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6 items-center">
              {session?.user ? (
                <>
                  {links.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className="text-[#5c3d2e] hover:text-[#c89666] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Button
                        onClick={() => signOut({callbackUrl:"/login"})}
                        className="bg-[#d7a86e] hover:bg-[#c89666] text-white px-4 py-2 rounded-lg transition"
                      >
                        Logout
                      </Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-[#5c3d2e] hover:text-[#c89666] transition-colors"
                >
                  Login
                </Link>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Menu (Hamburger) */}
        <div className="md:hidden">
          <MobileMenu  links={links} />
        </div>
      </div>
    </header>
  );
}

// Mobile Menu Component
