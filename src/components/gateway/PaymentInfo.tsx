
export default function PaymentInfo() {
  return (
    <>
      <div className="pt-3 mx-4 text-center">
        <div className="flex flex-wrap justify-center">
          <div className="w-full">
            <div className="rounded-lg shadow-md mb-4 py-6 font-bold text-gray-500">
              <h2 className="text-sm text-gray-700">Payable Amount</h2>
              <h1 className="text-xl font-bold"><span className="text-3xl text-orange-400">0.0063 ETH</span> (11.5 USD)</h1>
            </div>
            <button
              className="transform rounded-md px-5 py-3 font-medium text-white transition-colors bg-gradient-to-r from-orange-300 to-orange-500 hover:from-pink-500 hover:to-yellow-500 transition duration-300 hover:scale-105">Complete Payment <span
                className="animate-ping absolute right-0 top-0 w-3 h-3  rounded-full bg-gradient-to-r from-orange-400 to-orange-700 "></span></button>
          </div>
        </div>
      </div>
      <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
        <div className="absolute flex -space-x-12 rounded-b-2xl">
          <div
            className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-orange-400/90 group-hover:bg-orange-600/90 z-10">
          </div>
          <div
            className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-orange-300/90 group-hover:bg-orange-500/90 z-20">
          </div>
          <div
            className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-orange-200/90 group-hover:bg-orange-400/90 z-30">
          </div>
          <div
            className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-orange-100/90 group-hover:bg-orange-300/90 z-40">
          </div>
          <div
            className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-orange-50/90 group-hover:bg-orange-200/90 z-50">
          </div>
        </div>
      </div>
    </>
  )
}