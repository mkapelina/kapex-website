import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#070d1a] text-[#a39d93]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <span className="text-white font-semibold text-lg tracking-[0.12em] uppercase">
              Kape<span className="text-[#c09040]">X</span>
            </span>
            <p className="mt-3 text-sm max-w-xs leading-relaxed">
              A private family office focused on long-term value creation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 text-xs tracking-[0.1em] uppercase">
            <div className="flex flex-col gap-3">
              <Link href="/#what-we-do" className="hover:text-white transition-colors">What We Do</Link>
              <Link href="/#who-we-are" className="hover:text-white transition-colors">Who We Are</Link>
              <Link href="/#portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/news" className="hover:text-white transition-colors">News</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/legal" className="hover:text-white transition-colors">Legal</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[#163059] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <span>© {year} KapeX LLC. All rights reserved.</span>
          <Link href="/legal" className="hover:text-white transition-colors">
            Disclaimer &amp; Legal Notice
          </Link>
        </div>
      </div>
    </footer>
  );
}
