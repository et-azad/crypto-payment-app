import { ReactNode } from "react";

export default function AlertCard({ children }: { children: ReactNode }) {
  return (
    <div className="p-4 m-4 text-red-800 border-t-4 border-red-300 bg-red-50 text-center text-xs font-medium rounded-md" role="alert">
      {children}
    </div>
  )
}