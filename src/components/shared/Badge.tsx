import { ReactNode } from "react";

export default function Badge({
  children,
  className
}: {
  children: ReactNode;
  className: string;
}) {
  return <span className={`bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${className}`}>{children}</span>
}