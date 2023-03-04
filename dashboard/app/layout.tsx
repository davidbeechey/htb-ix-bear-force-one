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
                    <main>
                        <h1 className="text-5xl">Sustainability Management System</h1>
                        {children}
                    </main>
                </main>
            </body>
        </html>
    );
}
