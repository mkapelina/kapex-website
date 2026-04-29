"use client";

import { useEffect, useState } from "react";

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

const RSS_URL =
  "https://news.google.com/rss/search?q=family+office+venture+capital+tech+investing&hl=en-US&gl=US&ceid=US:en";

const PROXIES = [
  `https://corsproxy.io/?${encodeURIComponent(RSS_URL)}`,
  `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_URL)}`,
];

async function fetchRSS(): Promise<string> {
  for (const url of PROXIES) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (res.ok) {
        const text = await res.text();
        if (text.includes("<item>")) return text;
      }
    } catch {
      // try next proxy
    }
  }
  throw new Error("All proxies failed");
}

function parseRSS(xml: string): FeedItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const items = Array.from(doc.querySelectorAll("item"));
  return items.slice(0, 18).map((item) => {
    const rawTitle = item.querySelector("title")?.textContent ?? "";
    const link = item.querySelector("link")?.textContent ?? "#";
    const pubDate = item.querySelector("pubDate")?.textContent ?? "";
    const sourceEl = item.querySelector("source");
    const source = sourceEl?.textContent ?? extractSource(rawTitle);
    const title = rawTitle.replace(/\s*-\s*[^-]+$/, "").trim();
    return { title, link, pubDate, source };
  });
}

function extractSource(raw: string): string {
  const match = raw.match(/-\s*([^-]+)$/);
  return match ? match[1].trim() : "";
}

function formatDate(raw: string): string {
  try {
    return new Date(raw).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return raw;
  }
}

export default function NewsPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchRSS()
      .then((xml) => setItems(parseRSS(xml)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-16 md:pt-20">
      <div className="bg-[#0a1628] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c09040] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            News
          </p>
          <h1 className="text-white text-4xl sm:text-5xl font-light tracking-tight">
            Market Intelligence
          </h1>
          <p className="mt-4 text-[#a39d93] max-w-lg">
            Curated headlines across family office investing, venture capital,
            and technology.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 section-pad">
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e2ddd5]">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white p-8 animate-pulse">
                <div className="h-3 bg-[#e2ddd5] rounded w-24 mb-4" />
                <div className="h-5 bg-[#e2ddd5] rounded w-full mb-2" />
                <div className="h-5 bg-[#e2ddd5] rounded w-3/4" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-24">
            <p className="text-[#a39d93] text-lg">
              Unable to load the news feed at this time.
            </p>
            <p className="text-[#6b655c] text-sm mt-2">Check back soon.</p>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[#a39d93] text-lg">No articles found.</p>
            <p className="text-[#6b655c] text-sm mt-2">Check back soon.</p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e2ddd5]">
            {items.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-8 flex flex-col hover:bg-[#f8f7f4] transition-colors duration-150 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#c09040] text-[10px] font-semibold tracking-[0.2em] uppercase truncate max-w-[60%]">
                    {item.source}
                  </span>
                  <span className="text-[#a39d93] text-xs ml-2 shrink-0">
                    {formatDate(item.pubDate)}
                  </span>
                </div>
                <h2 className="text-[#0a1628] text-sm font-medium leading-snug group-hover:text-[#163059] transition-colors">
                  {item.title}
                </h2>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
