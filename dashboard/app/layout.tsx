import "./globals.css";

export const metadata = {
    title: "Sustainability Management System",
    description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-black text-gray-100">
                <main>
                    <header className="bg-gray-900 p-8">
                        <h1 className="text-3xl font-light">[Site Name]</h1>
                    </header>
                    <div className="flex m-8">
                        <div className="basis-1/5"></div>
                        <div className="basis-4/5">{children}</div>
                    </div>
                </main>
            </body>
        </html>
    );
}
