import { ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ 
  children, 
  className,
  hover = false,
  padding = 'md',
  ...props
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        'rounded-2xl bg-white border border-gray-200 shadow-lg',
        paddingClasses[padding],
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
