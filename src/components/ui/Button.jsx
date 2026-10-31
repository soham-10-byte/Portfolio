import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useMagnetic } from '../../hooks/useMagnetic';

/**
 * Pill-shaped action button with signature arrow nudging on hover.
 * Strictly adheres to the 6 palette colors:
 * - primary: fill #DAF1DE (--c-100), text #051F20 (--c-900)
 * - outline: 1px #8EB69B (--c-400) border, text #DAF1DE (--c-100), hover fill #235347 (--c-600)
 * - ghost: text #8EB69B (--c-400), hover text #DAF1DE (--c-100)
 */
export default function Button({
  children,
  variant = 'primary', // 'primary' | 'outline' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon = 'right',     // 'right' | 'up-right' | 'none'
  magnetic = false,
  href,
  download,
  target,
  rel,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  const magneticRef = useMagnetic(magnetic && !disabled);

  const baseStyles =
    'group relative inline-flex items-center justify-center font-body font-bold uppercase tracking-tracked transition-all duration-300 rounded-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c100 focus-visible:ring-offset-2 focus-visible:ring-offset-c900 select-none';

  const sizeStyles = {
    sm: 'px-5 py-2 text-xs gap-1.5',
    md: 'px-7 py-3 text-xs md:text-sm gap-2',
    lg: 'px-9 py-4 text-sm md:text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-c100 text-c900 hover:shadow-mint-glow hover:brightness-105 active:scale-[0.98]',
    outline:
      'border border-c400 text-c100 hover:bg-c600/40 hover:border-c100 active:scale-[0.98]',
    ghost:
      'text-c400 hover:text-c100 hover:bg-c700/40 active:scale-[0.98]',
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon === 'right' && (
        <ArrowRight
          size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
      {icon === 'up-right' && (
        <ArrowUpRight
          size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  if (href) {
    return (
      <a
        ref={magneticRef}
        href={href}
        download={download}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        onClick={onClick}
        className={combinedClasses}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={magneticRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
