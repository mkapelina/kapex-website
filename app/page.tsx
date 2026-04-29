import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-[#0a1628] overflow-hidden">
        {/* Subtle grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#c09040 1px, transparent 1px), linear-gradient(90deg, #c09040 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Gold accent bar */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-1 bg-[#c09040]"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
          <p className="text-[#c09040] text-xs tracking-[0.3em] uppercase mb-6 font-medium">
            Private Family Office
          </p>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight max-w-3xl">
            Investing in what<br />
            <span className="font-semibold text-white">comes next.</span>
          </h1>
          <p className="mt-8 text-[#a39d93] text-lg sm:text-xl max-w-xl leading-relaxed">
            KapeX is a private family office deploying capital into real assets
            and future-forward technology.
          </p>
          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-block bg-[#c09040] text-[#070d1a] text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#d4a853] transition-colors duration-200"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* ── What We Do ────────────────────────────────────── */}
      <section id="what-we-do" className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[#c09040] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
              What We Do
            </p>
            <h2 className="text-[#0a1628] text-3xl sm:text-4xl font-light leading-tight tracking-tight max-w-lg">
              Two verticals. One long-horizon mandate.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-[#e2ddd5]">
            {/* Real Assets */}
            <div className="bg-white p-10 md:p-14">
              <div className="w-8 h-px bg-[#c09040] mb-8" />
              <h3 className="text-[#0a1628] text-xl font-semibold tracking-tight mb-4">
                Real Assets
              </h3>
              <p className="text-[#6b655c] leading-relaxed">
                Residential construction and development with a focus on
                Naples, Florida. We seek projects that combine design
                excellence with long-term value in premier coastal markets.
              </p>
            </div>

            {/* Technology */}
            <div className="bg-white p-10 md:p-14">
              <div className="w-8 h-px bg-[#c09040] mb-8" />
              <h3 className="text-[#0a1628] text-xl font-semibold tracking-tight mb-4">
                Technology
              </h3>
              <p className="text-[#6b655c] leading-relaxed">
                Passive and active investments in high-conviction technology
                companies at the frontier of healthcare, artificial
                intelligence, and emerging sectors shaping the next economy.
              </p>
            </div>
          </div>

          {/* Entrepreneur pitch */}
          <div className="mt-14 border-l-2 border-[#c09040] pl-8">
            <p className="text-[#0a1628] text-lg leading-relaxed max-w-2xl">
              We are actively seeking new opportunities in early and
              growth-stage technology. If you are building something
              remarkable, we want to hear from you.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block text-[#c09040] text-xs font-semibold tracking-[0.2em] uppercase hover:text-[#d4a853] transition-colors duration-200 border-b border-[#c09040] hover:border-[#d4a853] pb-0.5"
            >
              Contact Us &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who We Are ────────────────────────────────────── */}
      <section id="who-we-are" className="section-pad bg-[#f8f7f4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#c09040] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
              Who We Are
            </p>
            <h2 className="text-[#0a1628] text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-10">
              Ownership mindset.<br />Long time horizon.
            </h2>
            <p className="text-[#6b655c] text-lg leading-relaxed">
              KapeX LLC is a private family office focused on long-term value
              creation through concentrated, high-conviction investments in real
              assets and transformative technology. We operate with a long time
              horizon and an ownership mindset — entering positions with the
              intent to hold, build, and compound value over years, not quarters.
            </p>
          </div>
        </div>
      </section>

      {/* ── Portfolio ─────────────────────────────────────── */}
      <section id="portfolio" className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[#c09040] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
              Portfolio
            </p>
            <h2 className="text-[#0a1628] text-3xl sm:text-4xl font-light leading-tight tracking-tight">
              Selected holdings.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e2ddd5]">
            {portfolioItems.map((item) => (
              <PortfolioCard key={item.name} {...item} />
            ))}
          </div>

          <p className="mt-8 text-[#a39d93] text-xs tracking-wide">
            No financial figures, ownership stakes, or deal terms are disclosed on this site.
          </p>
        </div>
      </section>
    </>
  );
}

const portfolioItems = [
  {
    name: "1085 Sandpiper",
    location: "Naples, FL",
    label: "Real Estate",
    description:
      "Custom single-family residential development in Naples, Florida.",
    href: "https://www.1085sandpiper.com",
  },
  {
    name: "Hone Health",
    location: null,
    label: "Technology / Healthcare",
    description:
      "Passive investment. Hone Health is a telehealth platform focused on men's hormone optimization and preventive care.",
    href: null,
  },
  {
    name: "Anthropic",
    location: null,
    label: "Technology / AI",
    description:
      "Passive investment. Anthropic is an AI safety company and the developer of the Claude family of AI models.",
    href: null,
  },
  {
    name: "Project Prometheus",
    location: null,
    label: "Technology / Physical AI",
    description:
      "Passive investment. Prometheus is a next-generation physical AI company backed by prominent technology investors.",
    href: null,
  },
];

function PortfolioCard({
  name,
  location,
  label,
  description,
  href,
}: {
  name: string;
  location: string | null;
  label: string;
  description: string;
  href: string | null;
}) {
  return (
    <div className="bg-white p-8 md:p-10 flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <span className="text-[#c09040] text-[10px] font-semibold tracking-[0.2em] uppercase">
          {label}
        </span>
      </div>
      <h3 className="text-[#0a1628] text-lg font-semibold tracking-tight">
        {name}
        {location && (
          <span className="block text-[#a39d93] text-sm font-normal mt-0.5">
            {location}
          </span>
        )}
      </h3>
      <p className="mt-4 text-[#6b655c] text-sm leading-relaxed flex-1">
        {description}
      </p>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 text-[#c09040] text-xs font-semibold tracking-[0.15em] uppercase hover:text-[#d4a853] transition-colors duration-200 self-start border-b border-[#c09040] hover:border-[#d4a853] pb-0.5"
        >
          Visit Site &rarr;
        </a>
      )}
    </div>
  );
}
