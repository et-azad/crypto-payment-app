import Image from "next/image";

export default function WalletInfo({
  walletAddress
}: {
  walletAddress: `0x${string}` | undefined
}) {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <Image src="/networks/eth.svg" width={140} height={140} alt="Networks"
          className="bg-white dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-14 -ml-18 lg:-ml-16 max-w-[150px]" />
      </div>
      <span
        className="m-2 float-right bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400 absolute top-0 right-0">
        Test Mode
      </span>
      <div className="mt-20 text-center">
        <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
          Goerli (Testnet)
        </h3>
        <p className="text-gray-500 text-xs">({walletAddress})</p>
      </div>
      <div className="p-4 m-4 text-red-800 border-t-4 border-red-300 bg-red-50 text-center text-xs font-medium rounded-md" role="alert">
        This is <b>Test Netwrok</b>. Payment will be marked as <b>Test Payment</b>.
      </div>
    </>
  )
}