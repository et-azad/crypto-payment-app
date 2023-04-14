import { ReactNode } from "react";
import TopPulse from "@/components/shared/TopPulse";
import ThunderIcon from "@/components/shared/ThunderIcon";

export enum ButtonType {
  Primary = "font-medium text-[16px] flex items-center justify-center px-5 py-3 rounded-md capitalize bg-gradient-to-r from-orange-300 to-orange-500 hover:from-orange-500 hover:to-yellow-500  relative gap-2 transition duration-300 hover:scale-105 text-white shadow-glass",
  Secondary = "font-medium text-[16px] flex items-center justify-center px-5 py-3 rounded-md capitalize border border-slate-200 gap-2 transition duration-300 hover:scale-105 text-slate-900 shadow-glass hover:bg-slate-50",
}

export default function Button({
  type = "button",
  theme = ButtonType.Secondary,
  isFullWidth = false,
  pulse = false,
  thunderIcon = false,
  disabled = false,
  onClick,
  children,
}: {
  type?: "button" | "submit";
  theme?: ButtonType;
  isFullWidth?: boolean;
  pulse?: boolean;
  thunderIcon?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button type={type} className={`${theme} ${isFullWidth && `w-full`}`} onClick={onClick} disabled={disabled}>
      {children}
      {thunderIcon && <ThunderIcon />}
      {pulse && <TopPulse />}
    </button>
  );
}
