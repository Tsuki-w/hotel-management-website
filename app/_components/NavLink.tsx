"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type IProps = {
  href: string;
  children: React.ReactNode;
};

export function NavLink({ href, children }: IProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`hover:text-accent-400 transition-colors font-bold ${pathname === href ? "text-accent-400" : ""}`}
    >
      {children}
    </Link>
  );
}
