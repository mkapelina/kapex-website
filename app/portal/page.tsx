import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function PortalDashboard() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const firstName = user?.firstName ?? "Member";

  const cards = [
    { label: "Portfolio", description: "Holdings overview and allocation", href: "/portal/portfolio", soon: false },
    { label: "Documents", description: "K-1s, statements, and entity filings", href: "#", soon: true },
    { label: "Meetings", description: "Agendas, minutes, and recordings", href: "#", soon: true },
    { label: "Distributions", description: "History and upcoming payments", href: "#", soon: true },
  ];

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm uppercase tracking-widest mb-1" style={{ color: "var(--color-gold, #c09040)" }}>
          Member Portal
        </p>
        <h1 className="text-3xl font-semibold text-white">
          Welcome back, {firstName}.
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => {
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{card.label}</span>
                {card.soon ? (
                  <span className="text-xs px-2 py-0.5 rounded-full border border-white/20 text-white/40">
                    Coming soon
                  </span>
                ) : (
                  <span className="text-xs" style={{ color: "#c09040" }}>→</span>
                )}
              </div>
              <p className="text-sm text-white/50">{card.description}</p>
            </>
          );

          const sharedClass =
            "rounded-lg border border-white/10 p-6 flex flex-col gap-2 transition-colors";
          const sharedStyle = { background: "rgba(255,255,255,0.03)" };

          return card.soon ? (
            <div key={card.label} className={sharedClass} style={sharedStyle}>
              {inner}
            </div>
          ) : (
            <Link
              key={card.label}
              href={card.href}
              className={`${sharedClass} hover:border-white/25 hover:bg-white/[0.05]`}
              style={sharedStyle}
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
