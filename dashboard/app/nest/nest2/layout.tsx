export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-full gap-2">
            <div className="bg-green-800 h-full p-8 basis-1/2">
                <h1>CAMPUS SENSORS</h1>
                <p>Blah blah blah</p>
            </div>
            <div className="basis-1/2">{children}</div>
        </div>
    );
}
