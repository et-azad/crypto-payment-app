import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Setting } from "@/components/models/setting";
import useToast from "@/hooks/useToast";

export default function Footer({
  footerOneliner,
}: {
  footerOneliner: string;
}) {
  const { _sessionTimout } = useSelector(({ setting }: { setting: Setting }) => setting.options);
  const [timeLeft, setTimeLeft] = useState("00:00");
  const router = useRouter();
  const { pushToast } = useToast();

  useEffect(() => {
    const cleanUp = setTimeout(() => {
      let checkExpired = false;
      let sessionTimout = localStorage.getItem("timeLeft") || _sessionTimout;
      const timer = setInterval(() => {
        sessionTimout = +sessionTimout - 1;
        localStorage.setItem(`timeLeft`, `${sessionTimout}`);
        const minutes = Math.floor(sessionTimout / 60);
        const seconds = sessionTimout % 60;
        let timeString = "";
        if (minutes === 0 && seconds === 0) {
          timeString = "Expired";
          checkExpired = true;
        } else if (!checkExpired) timeString = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        if (checkExpired) {
          if (!localStorage.getItem("_transaction")) {
            localStorage.removeItem("timeLeft");
            pushToast("error", "Session has been expired");
            router.replace("/setup/pay");
            clearInterval(timer);
          }
        }
        setTimeLeft(timeString);
      }, 1000)
    }, 100);

    return () => clearTimeout(cleanUp);
  }, [router, pushToast, _sessionTimout])

  return (
    <>
      <footer className="bg-gray-900 py-2 fixed bottom-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            {footerOneliner !== "" && (
              <div className="w-0 flex-1 flex items-center">
                <p className="ml-3 font-medium text-white truncate">
                  <span className="hidden md:inline">{footerOneliner}</span>
                </p>
              </div>
            )}
            <div className="order-3 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <p className="font-medium text-[16px] flex items-center justify-center px-5 py-2 rounded-xl text-white shadow-glass w-full">
                Session will expire in - <span className="text-orange-400 ml-1">{timeLeft}
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
