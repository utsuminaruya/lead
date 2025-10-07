
import * as React from "react";
export function Card({ className = "", children }: React.PropsWithChildren<{className?: string}>) {
  return <div className={`card p-6 ${className}`}>{children}</div>;
}
export function CardHeader({ children }: React.PropsWithChildren) {
  return <div className="mb-4">{children}</div>;
}
export function CardTitle({ children }: React.PropsWithChildren) {
  return <h3 className="text-xl font-semibold">{children}</h3>;
}
export function CardContent({ children }: React.PropsWithChildren) {
  return <div>{children}</div>;
}
