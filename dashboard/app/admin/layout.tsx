export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className="space-y-8">
          <h1 className="text-6xl font-bold">👨🏻‍💼 Admin</h1>
          {children}
      </div>
  );
}
