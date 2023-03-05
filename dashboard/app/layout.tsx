import "./globals.css";
import Providers from "./Providers";
import Image from "next/image";
import { NavLink } from "./NavLink";
import axios from "axios";

export const metadata = {
    title: "Bearly Sustainable",
    description: "",
};

async function getUniversities() {
    const res = await axios
        .get("https://nbmgmb9465.execute-api.eu-west-1.amazonaws.com/DEV/university")
        .then((res) => res.data.universities)
        .catch((err) => console.log(err));
    return res.Items.map((item: any) => item.university);
}

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Providers>
                <body className="bg-black text-gray-100">
                    <main>
                        <header className="bg-gray-900 p-8 flex gap-8 items-center">
                            <Image src="/bear.png" alt="bear" width="50" height="50" />
                            <h1 className="text-3xl font-light">BearlySustainable</h1>
                            <div className="flex overflow-x-auto">
                                <ul className="flex space-x-4 whitespace-nowrap">
                                    {(await getUniversities()).map((university: string) => (
                                        <NavLink
                                            key={university}
                                            href={`/${university}`}
                                            text={university}
                                        />
                                    ))}
                                    <li>
                                        <NavLink href="/api/auth/login" text="Login" />
                                    </li>
                                </ul>
                            </div>
                        </header>
                        {children}
                    </main>
                </body>
            </Providers>
        </html>
    );
}
