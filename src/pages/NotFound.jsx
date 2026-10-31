import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PillTag from '@/components/ui/PillTag';

/**
 * 404 Not Found Page
 * Uses the shared forest, chalk, and sage design system.
 */
export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24 max-w-xl mx-auto z-10">
      <div className="mb-4">
        <PillTag active>ERROR 404</PillTag>
      </div>

      <div
        className="font-display font-black text-8xl sm:text-9xl select-none leading-none mb-4"
        style={{
          WebkitTextStroke: '2px #DAF1DE',
          color: 'transparent',
        }}
      >
        404
      </div>

      <h1 className="text-2xl sm:text-4xl font-display font-black text-c100 uppercase tracking-tight mb-4">
        PAGE NOT FOUND
      </h1>

      <p className="text-sm sm:text-base text-c400 font-body mb-8 leading-relaxed max-w-md">
        The route you are looking for does not exist or has been relocated. Explore the MERN stack products or performance marketing case studies from the homepage.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-pill bg-c100 text-c900 font-body font-bold text-sm tracking-tracked uppercase hover:shadow-mint-glow hover:brightness-105 active:scale-[0.98] transition-all"
      >
        <ArrowLeft size={16} />
        <span>BACK HOME</span>
      </Link>
    </div>
  );
}

