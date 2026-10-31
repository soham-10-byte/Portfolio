import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const highlights = [
  {
    label: 'MONTHLY SALES',
    title: '₹15L+',
    detail: 'Reported monthly sales result for the completed Steelam campaign.',
  },
  {
    label: 'GROWTH CHANNELS',
    title: 'SEO + PAID MEDIA',
    detail: 'Search visibility and performance campaigns planned as one growth system.',
  },
  {
    label: 'PROJECT STATUS',
    title: 'COMPLETED',
    detail: 'Furniture growth work delivered across search and paid acquisition.',
  },
];

export default function CaseHighlightsSlider() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="mb-20" aria-labelledby="steelam-highlights-title">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mb-1 block text-xs font-display font-bold uppercase tracking-tracked text-c400">
            CAMPAIGN SNAPSHOT
          </span>
          <h2
            id="steelam-highlights-title"
            className="font-display text-xl font-black uppercase tracking-tight text-c100 sm:text-2xl"
          >
            PROJECT HIGHLIGHTS
          </h2>
        </div>
        <span className="text-xs font-body text-c400">Hover or select a highlight to pause</span>
      </div>

      <div className={`case-highlights ${isPaused ? 'is-paused' : ''}`}>
        <div className="case-highlights__track">
          {[false, true].map((duplicate) => (
            <div
              key={duplicate ? 'duplicate' : 'highlights'}
              className="case-highlights__group"
              aria-hidden={duplicate || undefined}
            >
              {highlights.map((highlight) => (
                <button
                  key={`${duplicate ? 'copy-' : ''}${highlight.label}`}
                  type="button"
                  tabIndex={duplicate ? -1 : 0}
                  aria-hidden={duplicate || undefined}
                  aria-label={`${highlight.label}: ${highlight.title}. Pause highlights.`}
                  onPointerEnter={() => setIsPaused(true)}
                  onPointerLeave={() => setIsPaused(false)}
                  onFocus={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                  onClick={() => setIsPaused(true)}
                  className="case-highlight-card w-[min(78vw,320px)] shrink-0 rounded-[24px] border border-c600/50 bg-c800/75 p-6 text-left transition-colors hover:border-c400/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c100 sm:w-[360px]"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-[10px] font-display font-bold uppercase tracking-tracked text-c400">
                      {highlight.label}
                    </span>
                    <ArrowUpRight size={16} className="text-c400" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-black uppercase leading-tight tracking-tight text-c100 sm:text-3xl">
                    {highlight.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-c100/75">{highlight.detail}</p>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[11px] text-c400/80">
        Results and campaign scope from the Steelam Furniture case study.
      </p>
    </section>
  );
}

