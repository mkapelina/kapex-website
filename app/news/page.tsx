import Parser from "rss-parser";

const RSS_URL =
  "https://news.google.com/rss/search?q=family+office+venture+capital+tech+investing&hl=en-US&gl=US&ceid=US:en";

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

async function fetchFeed(): Promise<FeedItem[]> {
  const parser = new Parser({ timeout: 10000 });
  const feed = await parser.parseURL(RSS_URL);
  return feed.items.slice(0, 18).map((item) => ({
    title: (item.title ?? "").replace(/\s*-\s*[^-]+$/, "").trim(),
    link: item.link ?? "#",
    pubDate: item.pubDate ?? "",
    source: (item as { source?: { $?: { url?: string }; _?: string } }).source?._ ?? extractSource(item.title ?? ""),
  }));
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

export default async function NewsPage() {
  let items: FeedItem[] = [];
  let fetchError = false;

  try {
    items = await fetchFeed();
  } catch {
    fetchError = true;
  }

  const builtAt = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
        {fetchError || items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#a39d93] text-lg">
              Unable to load the news feed at this time.
            </p>
            <p className="text-[#6b655c] text-sm mt-2">Check back soon.</p>
          </div>
        ) : (
          <>
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
            <p className="mt-6 text-[#a39d93] text-xs">
              Last updated {builtAt}. Run a new deploy to refresh.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
