import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
};

export default function Heading({ level = 1, children, className }: Props) {
  const Tag = \`h\${level}\` as keyof JSX.IntrinsicElements;
  const base =
    "font-[var(--font-heading)] text-[var(--color-text)] tracking-wide";
  const sizes: Record<number, string> = {
    1: "text-3xl md:text-5xl",
    2: "text-2xl md:text-3xl",
    3: "text-xl md:text-2xl",
    4: "text-lg md:text-xl"
  };

  return <Tag className={clsx(base, sizes[level], className)}>{children}</Tag>;
}
