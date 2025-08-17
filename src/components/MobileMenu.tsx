"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { linkType } from "@/types/type";

function MobileMenu({ links }: { links: linkType[] }) {
  const { data: session } = useSession();
  return (
    <div className="relative">
      <details>
        <summary className="list-none cursor-pointer text-[#5c3d2e] text-lg ">
          <span className="text-2xl">☰</span>
        </summary>

        <div className="absolute right-0 mt-2 bg-white border border-[#e0c097] rounded-lg shadow-lg w-48 p-4 space-y-3 z-50">
          {session ? (
            <>
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block text-[#5c3d2e] hover:text-[#c89666] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                onClick={() => signOut()}
                className="w-full bg-[#d7a86e] hover:bg-[#c89666] text-white rounded-lg"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className="block text-[#5c3d2e] hover:text-[#c89666] transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </details>
    </div>
  );
}
export default MobileMenu;
