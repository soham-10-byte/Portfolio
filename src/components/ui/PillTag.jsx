import React from 'react';

/**
 * PillTag component - Signature outline pill tag with tiny pill indicator and uppercase label.
 */
export default function PillTag({
  children,
  className = '',
  active = false,
  size = 'md', // 'sm' | 'md'
}) {
  const sizeClasses = {
    sm: 'px-3 py-1 text-[10px] tracking-wider gap-1.5',
    md: 'px-4 py-1.5 text-xs tracking-tracked gap-2',
  };

  return (
    <span
      className={`inline-flex items-center rounded-pill border font-body uppercase font-medium transition-colors select-none ${
        active
          ? 'border-c400/60 bg-c700/60 text-c100'
          : 'border-c600/50 bg-c800/60 text-c400'
      } ${sizeClasses[size]} ${className}`}
    >
      <span
        className={`w-1.5 h-3 rounded-full transition-colors ${
          active ? 'bg-c100' : 'bg-c400/60'
        }`}
        aria-hidden="true"
      />
      <span>{children}</span>
    </span>
  );
}

