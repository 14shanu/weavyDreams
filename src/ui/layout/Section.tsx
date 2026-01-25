import { ReactNode } from 'react';
import clsx from 'clsx';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'default' | 'alt';
  spacing?: 'sm' | 'md' | 'lg';
  id?: string;
}

export default function Section({
  children,
  className,
  background = 'default',
  spacing = 'md',
  id,
}: SectionProps) {
  const bgClasses = {
    default: 'bg-[var(--color-bg)]',
    alt: 'bg-[var(--color-bg-alt)]',
  };

  const spacingClasses = {
    sm: 'py-8 sm:py-12',
    md: 'py-10 sm:py-14 md:py-16',
    lg: 'py-12 sm:py-16 md:py-20',
  };

  return (
    <section
      id={id}
      className={clsx(bgClasses[background], spacingClasses[spacing], className)}
    >
      {children}
    </section>
  );
}
