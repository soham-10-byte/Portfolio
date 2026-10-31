import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Mail, MessageCircle, FileText } from 'lucide-react';
import { profile, contact, cta } from '@/data/content';

/**
 * Global Footer Component
 * 6. FOOTER: wordmark, nav links (including Development and Marketing), socials, back-to-top pill.
 */
export default function Footer() {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const footerNavLinks = [
    { label: 'HOME', href: '/#home', isRoute: false },
    { label: 'WORKS', href: '/#works', isRoute: false },
    { label: 'ABOUT', href: '/#about', isRoute: false },
    { label: 'SKILLS', href: '/#skills', isRoute: false },
    { label: 'SERVICES', href: '/#services', isRoute: false },
    { label: 'CONTACT', href: '/#contact', isRoute: false },
    { label: 'DEVELOPMENT', href: '/development', isRoute: true },
    { label: 'MARKETING', href: '/marketing', isRoute: true },
  ];

  return (
    <footer className="relative bg-c900 border-t border-c600/30 text-c400 overflow-hidden pt-16 pb-12">
      {/* Ambient bottom-right spotlight */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[300px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 100% 100%, #DAF1DE, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Grid: Wordmark & Brand, Nav Links, Direct Channels, Back to Top */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-c600/30">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <Link to="/" className="group flex items-center gap-3">
              <div className="w-8 h-12 rounded-full border border-c400/40 bg-c800 p-1 flex flex-col items-center justify-center group-hover:border-c100 group-hover:shadow-mint-glow-sm transition-all">
                <div className="w-4 h-6 rounded-full bg-c100 flex items-center justify-center">
                  <div className="w-2 h-3 rounded-full bg-c900" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl text-c100 uppercase tracking-tight group-hover:text-glow transition-all">
                  {profile.name}
                </span>
                <span className="text-[9px] tracking-tracked text-c400 font-body uppercase -mt-0.5">
                  MERN STACK + GROWTH MARKETING
                </span>
              </div>
            </Link>

            <p className="max-w-md text-sm text-c400/90 font-body leading-relaxed">
              {profile.summary}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-c800/80 border border-c600/50 text-xs font-body text-c100">
              <span className="w-2 h-2 rounded-full bg-c100 animate-pulse" />
              <span>Available for full-stack engineering &amp; growth consulting</span>
            </div>
          </div>

          {/* Navigation Links including Development and Marketing (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs tracking-tracked uppercase text-c100 font-display font-bold mb-1">
              EXPLORE
            </span>
            <nav className="flex flex-col gap-2 text-xs font-body uppercase tracking-wider font-semibold">
              {footerNavLinks.map((item) =>
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-c400 hover:text-c100 hover:translate-x-1 transition-all py-1 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-c100/60" />
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-c400 hover:text-c100 hover:translate-x-1 transition-all py-1 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-c600" />
                    <span>{item.label}</span>
                  </a>
                )
              )}
            </nav>
          </div>

          {/* Direct Channels & Socials (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs tracking-tracked uppercase text-c100 font-display font-bold">
                CONNECT DIRECTLY
              </span>
              <div className="flex flex-col gap-2.5 text-xs font-body">
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-c400 hover:text-c100 transition-colors py-1 min-h-[32px]"
                >
                  <MessageCircle size={15} className="text-c400" />
                  <span>WhatsApp ({contact.phone})</span>
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 text-c400 hover:text-c100 transition-colors py-1 min-h-[32px]"
                >
                  <Mail size={15} className="text-c400" />
                  <span>{contact.email}</span>
                </a>

                <a
                  href={contact.github === '[PLACEHOLDER URL]' ? '#contact' : contact.github}
                  target={contact.github === '[PLACEHOLDER URL]' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-c400 hover:text-c100 transition-colors py-1 min-h-[32px]"
                >
                  <Github size={15} />
                  <span>GitHub Profile</span>
                </a>

                <a
                  href={contact.linkedin === '[PLACEHOLDER URL]' ? '#contact' : contact.linkedin}
                  target={contact.linkedin === '[PLACEHOLDER URL]' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-c400 hover:text-c100 transition-colors py-1 min-h-[32px]"
                >
                  <Linkedin size={15} />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href={contact.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 text-c100 hover:text-c400 transition-colors font-semibold py-1 min-h-[32px]"
                >
                  <FileText size={15} className="text-c100" />
                  <span className="underline underline-offset-4 decoration-c400/40">
                    {cta.resume}
                  </span>
                </a>
              </div>
            </div>

            {/* Back to Top Pill Button */}
            <div className="flex items-center justify-start md:justify-end">
              <button
                type="button"
                onClick={scrollToTop}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-pill border border-c400/50 bg-c800/90 text-c100 text-xs font-body uppercase tracking-tracked hover:bg-c700 hover:border-c100 hover:shadow-mint-glow-sm transition-all duration-300 min-h-[44px]"
                aria-label="Scroll back to top of page"
              >
                <span>BACK TO TOP</span>
                <ArrowUp
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-1"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Built with */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-c400/70 font-body">
          <p>
            © {currentYear} {profile.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-c100" />
            <span>BUILT WITH REACT, THREE.JS, FRAMER MOTION &amp; TAILWIND CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
