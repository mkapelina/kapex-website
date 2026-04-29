export default function LegalPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Page header */}
      <div className="bg-[#0a1628] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c09040] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Legal
          </p>
          <h1 className="text-white text-4xl sm:text-5xl font-light tracking-tight">
            Disclaimer &amp; Legal Notice
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 section-pad">
        <div className="prose-legal">
          <Section title="Not a Registered Investment Adviser">
            <p>
              KapeX LLC is a private family office and is <strong>not</strong> a
              registered investment adviser, broker-dealer, or investment company
              under the Investment Advisers Act of 1940, the Securities Exchange
              Act of 1934, or the Investment Company Act of 1940, or any
              applicable state securities laws. KapeX LLC does not provide
              investment advisory services to any person or entity other than its
              principals and affiliates.
            </p>
          </Section>

          <Section title="No Offer or Solicitation">
            <p>
              Nothing on this website, including any statements, data,
              information, content, or materials contained herein, constitutes,
              or should be construed as, an offer to sell, a solicitation of an
              offer to buy, or a recommendation of any security, investment
              product, fund, or other financial instrument. No content on this
              site should be relied upon as the basis for any investment
              decision.
            </p>
          </Section>

          <Section title="No Investment Advice">
            <p>
              The information contained on this website is provided for
              informational and general reference purposes only. It does not
              constitute investment, legal, tax, accounting, or financial advice.
              You should consult qualified professional advisers regarding your
              specific financial situation, objectives, and legal requirements
              before making any investment or financial decision.
            </p>
          </Section>

          <Section title="Past Performance">
            <p>
              Any references to past performance, historical results, or prior
              investments described on this website are provided for illustrative
              purposes only. Past performance is not indicative of future results.
              All investments involve risk, including the possible loss of
              principal. There can be no assurance that any investment strategy
              or transaction will achieve its objectives.
            </p>
          </Section>

          <Section title="Forward-Looking Statements">
            <p>
              Certain statements or descriptions on this website may constitute
              forward-looking statements. Such statements are based on current
              expectations and assumptions and involve known and unknown risks and
              uncertainties that may cause actual results, performance, or
              achievements to differ materially from those expressed or implied.
              KapeX LLC undertakes no obligation to update any forward-looking
              statements to reflect events or circumstances after the date on
              which they are made.
            </p>
          </Section>

          <Section title="Third-Party Information">
            <p>
              This website may reference or link to third-party companies,
              products, or services for informational purposes only. KapeX LLC
              does not endorse, sponsor, or recommend any third-party company or
              investment opportunity referenced on this site. KapeX LLC has no
              responsibility for the content, accuracy, or availability of any
              third-party website or resource.
            </p>
          </Section>

          <Section title="Contact and Inquiries">
            <p>
              KapeX LLC welcomes inquiries from entrepreneurs, co-investors, and
              business partners through the contact form available on this
              website. The availability of a contact form does not constitute an
              obligation to respond to, evaluate, or act upon any inquiry
              submitted. Submission of any unsolicited proposal or business plan
              does not create any obligation on the part of KapeX LLC. All
              communications submitted through this website are non-confidential
              unless otherwise agreed in writing.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, KapeX LLC, its
              principals, affiliates, officers, and agents shall not be liable
              for any direct, indirect, incidental, special, or consequential
              damages arising from your use of, or reliance on, any information
              contained on this website. Use of this website is at your own risk.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>
              This legal notice is governed by and construed in accordance with
              the laws of the State of Florida, without regard to its conflict of
              laws principles. Any disputes arising from your use of this website
              shall be subject to the exclusive jurisdiction of the courts located
              in the State of Florida.
            </p>
          </Section>

          <p className="mt-12 text-[#a39d93] text-xs border-t border-[#e2ddd5] pt-6">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-[#0a1628] text-lg font-semibold tracking-tight mb-3">
        {title}
      </h2>
      <div className="text-[#6b655c] leading-relaxed [&_strong]:text-[#0a1628] [&_strong]:font-semibold">
        {children}
      </div>
    </div>
  );
}
