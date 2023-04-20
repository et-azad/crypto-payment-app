
export default function BottomAnimation() {
  return (
    <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
      <div className="absolute flex -space-x-12 rounded-b-2xl">
        <div
          className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-orange-500/90 group-hover:bg-orange-600/90 z-10">
        </div>
        <div
          className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-orange-400/90 group-hover:bg-orange-500/90 z-20">
        </div>
        <div
          className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-orange-300/90 group-hover:bg-orange-400/90 z-30">
        </div>
        <div
          className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-orange-200/90 group-hover:bg-orange-300/90 z-40">
        </div>
        <div
          className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-orange-100/90 group-hover:bg-orange-200/90 z-50">
        </div>
        <div
          className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-orange-50/90 group-hover:bg-orange-100/90 z-50">
        </div>
      </div>
    </div>
  )
}