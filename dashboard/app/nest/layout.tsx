export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full">
            <div className="flex">
                <div className="basis-1/3 bg-blue-800 p-8">
                    <h1>ALL SENSORS</h1>
                    <p>Blah blah blah</p>
                </div>
                <div className="basis-2/3">{children}</div>
            </div>
        </div>
    );
}
