
import * as React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" };
export function Button({ className = "", variant = "primary", ...props }: Props) {
  const base = "btn " + (variant === "primary" ? "btn-primary" : "btn-outline");
  return <button data-pressed={variant==="primary"} className={base + " " + className} {...props} />;
}
