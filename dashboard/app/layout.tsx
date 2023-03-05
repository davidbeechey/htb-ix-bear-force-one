import axios from "axios";
import Image from "next/image";
import "./globals.css";
import { NavLink } from "./NavLink";
import Providers from "./Providers";
import { Sensor } from "./types";

export const metadata = {
    title: "Sustainability Management System",
    description: "",
};

const LINKS = [
    {
        href: "/",
        text: "Home",
    },
    {
        href: "/air-quality",
        text: "Air Quality",
    },
    {
        href: "/energy-consumption",
        text: "Energy Consumption",
    },
    {
        href: "/water-quality",
        text: "Water Quality",
    },
    {
        href: "/admin",
        text: "Admin",
    },
];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Providers>
                <body className="bg-black text-gray-100">
                    <main>
                        <header className="bg-gray-900 p-8 flex gap-4">
                            <Image src="/bear.png" alt="bear" width="50" height="50" />
                            <h1 className="text-3xl font-light">Bearly Sustainable</h1>
                        </header>
                        <div className="flex m-8 gap-8">
                            <div className="basis-1/5">
                                <nav>
                                    <ul className="space-y-2">
                                        {LINKS.map((link, index) => (
                                            <NavLink
                                                key={index}
                                                href={link.href}
                                                text={link.text}
                                            />
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                            <div className="flex-grow">{children}</div>
                        </div>
                    </main>
                </body>
            </Providers>
        </html>
    );
}
