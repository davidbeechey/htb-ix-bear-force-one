import { CustomAccordion } from "@/components/Accordion";
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

async function getUniversities() {
    const res = await axios
        .get("https://nbmgmb9465.execute-api.eu-west-1.amazonaws.com/DEV/university")
        .then((res) => res.data.universities)
        .catch((err) => console.log(err));
    return res.Items.map((item: any) => item.university);
}

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
];

const ADMIN_LINKS = [
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
                            <h1 className="text-3xl font-light">BearlySustainable</h1>
                            <div className="flex overflow-x-auto">
                                <ul className="flex space-x-4 whitespace-nowrap">
                                    {
                                        (await getUniversities()).map((university: string) => (
                                            <NavLink key={university} href={`/${university}`} text={university} />
                                        ))
                                    }
                                </ul>
                            </div>
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
                                        <li className="pt-8">
                                            <CustomAccordion
                                                items={[
                                                    {
                                                        name: "Admin",
                                                        content: (
                                                            <div>
                                                                {ADMIN_LINKS.map((link, index) => (
                                                                    <NavLink
                                                                        key={index}
                                                                        href={link.href}
                                                                        text={link.text}
                                                                    />
                                                                ))}
                                                            </div>
                                                        ),
                                                    },
                                                ]}
                                            />
                                        </li>
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
