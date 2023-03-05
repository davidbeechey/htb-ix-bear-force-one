"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    text: string;
}

export const NavLink = ({ href, text }: NavLinkProps) => {
    const pathname = usePathname();

    if (pathname === href || pathname?.split("/")[2] === href) {
        return (
            <li>
                <div className="p-4 rounded-lg bg-gray-700">{text}</div>
            </li>
        );
    }

    return (
        <li>
            <Link href={href}>
                <div className="p-4 rounded-lg bg-gray-900 hover:bg-gray-800">{text}</div>
            </Link>
        </li>
    );
};
