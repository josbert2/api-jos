const LOGOS = [
  "Figma",
  "Adobe",
  "Sketch",
  "Framer",
  "Webflow",
  "Notion",
  "Stripe",
  "Vercel",
  "NextJS",
  "React",
];

export function LogosCarousel() {
  return (
    <section className="py-20 px-5 bg-[#141414] border-t border-b border-[#1f1f1f]">
      <div className="container space-y-8">
        <p className="text-center text-sm text-[#5a6068] font-medium">
          TRUSTED BY LEADING COMPANIES
        </p>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <div className="flex gap-12">
            {/* First Set */}
            {LOGOS.map((logo, i) => (
              <div
                key={`first-${i}`}
                className="flex items-center justify-center h-12 px-8 flex-shrink-0 text-[#5a6068] font-medium text-sm whitespace-nowrap"
              >
                {logo}
              </div>
            ))}

            {/* Duplicate for seamless loop */}
            {LOGOS.map((logo, i) => (
              <div
                key={`second-${i}`}
                className="flex items-center justify-center h-12 px-8 flex-shrink-0 text-[#5a6068] font-medium text-sm whitespace-nowrap"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
