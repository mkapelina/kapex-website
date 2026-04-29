import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-navy-950, #070d1a)" }}>
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold tracking-widest uppercase" style={{ color: "var(--color-gold, #c09040)" }}>
            KapeX
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/60">
            <Link href="/portal" className="hover:text-white transition-colors">Dashboard</Link>
          </nav>
        </div>
        {userId && <UserButton />}
      </header>

      <main className="flex-1 px-6 py-10 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
