import { ReactNode } from "react";

export default function Intro({
  topHeading,
  mainHeading,
  children,
}: {
  topHeading: string;
  mainHeading: string;
  children: ReactNode;
}) {
  return (
    <div className="text-center">
      <p className="text-lg font-medium leading-8 text-orange-500">
        {topHeading}
      </p>
      <h1 className="cursor-pointer mt-3 py-14 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-gray-900 shadow-2xl rounded-xl transition duration-300 hover:scale-105">
        {mainHeading}
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-slate-400">{children}</p>
    </div>
  );
}
