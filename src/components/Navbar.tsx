export default function Navbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 md:px-12 border-b border-[#EEEEEE] bg-white sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#E60012] flex items-center justify-center text-white font-bold text-xs">U/G</div>
        <h1 className="text-lg font-medium tracking-tight text-[#1A1A1A]">
          我的 U/G 選品型錄
        </h1>
      </div>
      <div className="hidden md:flex gap-6 text-sm text-[#666]">
        <span className="border-b border-black text-black">選品清單</span>
        <span className="cursor-pointer hover:text-black transition-colors">台日比價</span>
        <span className="cursor-pointer hover:text-black transition-colors">設定</span>
      </div>
    </header>
  );
}
