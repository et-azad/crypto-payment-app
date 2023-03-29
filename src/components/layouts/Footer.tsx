import Button, { ButtonType } from "@/components/shared/Button";

export default function Footer({
  isSetup,
  footerOneliner,
}: {
  isSetup: boolean;
  footerOneliner: string;
}) {
  return (
    <footer className="bg-gray-900 py-4 fixed bottom-0 w-full z-10">
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
            {isSetup && (
              <Button type={ButtonType.Primary} isFullWidth pulse thunderIcon>
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
