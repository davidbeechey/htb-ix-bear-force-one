import "./globals.css";

export const metadata = {
    title: "Sustainability Management System",
    description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-black text-gray-100">{children}</body>
        </html>
    );
}
