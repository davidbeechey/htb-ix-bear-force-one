import Link from "next/link";

interface NavLinkProps {
    href: string;
    text: string;
}

export const NavLink = ({ href, text }: NavLinkProps) => {
    return (
        <li>
            <Link href={href}>
                <div className="p-4 rounded-lg bg-gray-900 hover:bg-gray-800">{text}</div>
            </Link>
        </li>
    );
};
