import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: PropsWithChildren<Props>) {
  const base =
    "inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-full transition";
  const variants: Record<string, string> = {
    primary:
      "bg-[var(--color-primary)] text-[var(--color-text-dark)] hover:bg-[var(--color-primary-dark)]",
    secondary:
      "border border-white/40 text-[var(--color-text)] hover:bg-white/10"
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
