import { CustomAccordion } from "@/components/Accordion";
import axios from "axios";
import Image from "next/image";
import { NavLink } from "../NavLink";
import Providers from "../Providers";
import { Sensor } from "../types";

export const metadata = {
    title: "Sustainability Management System",
    description: "",
};

const ADMIN_LINKS = [
    {
        href: "/admin",
        text: "Admin",
    },
];

export default function RootLayout({
    params,
    children,
}: {
    params: { university: string };
    children: React.ReactNode;
}) {
    const LINKS = [
        {
            href: `/${params.university}`,
            text: "Overview",
        },
        {
            href: `/${params.university}/air-quality`,
            text: "Air Quality",
        },
        {
            href: `/${params.university}/energy-consumption`,
            text: "Energy Consumption",
        },
        {
            href: `/${params.university}/water-quality`,
            text: "Water Quality",
        },
    ];

    return (
        <div className="flex m-8 gap-8">
            <div className="basis-1/5">
                <nav>
                    <ul className="space-y-2">
                        {LINKS.map((link, index) => (
                            <NavLink key={index} href={link.href} text={link.text} />
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
    );
}
