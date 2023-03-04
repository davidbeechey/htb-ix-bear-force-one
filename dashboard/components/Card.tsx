export default function Card({ children }: { children: React.ReactNode }) {
    return <div className="bg-gray-900 rounded-lg shadow-lg p-4">{children}</div>;
}
