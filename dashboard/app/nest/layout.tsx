export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex gap-2 h-full">
            <div className="basis-1/3 bg-blue-800 p-8">
                <h1>ALL SENSORS</h1>
                <p>Blah blah blah</p>
            </div>
            <div className="basis-2/3">{children}</div>
        </div>
    );
}
