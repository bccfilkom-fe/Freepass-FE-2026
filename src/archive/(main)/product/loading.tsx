export default function Loading() {
  const tampilan = () => {
    const kotak = [];

    for (let i = 0; i < 8; i++) {
      kotak.push(
        <div className="bg-white flex flex-col 
          [&_p,h2]:line-clamp-2 relative **:animate-pulse"
          key={i}>
          <div className="group bg-gray-100 w-full aspect-square overflow-clip mb-5 self-center relative flex items-center justify-center">
          </div>
          <div className="">
            <div className="w-full text-md h-[1.7rem] bg-black/20 mb-2"></div>
            <div className="w-2/3 text-md h-4 bg-black/20 mb-2"></div>
            <div className="w-1/5 text-md h-4 bg-black/20 mb-2"></div>
          </div>
        </div >
      );
    }

    return (
      <div className="p-5 lg:p-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-5">
        {kotak}
      </div>
    );
  };
  return (
    <>
      <div className="border-b border-t border-black/10 flex gap-10 p-4 px-12
    [&_p]:text-lg [&_p]:font-bold
    **:animate-pulse
    ">
        <div className="flex bg-black/20 h-5 w-20 items-center gap-1 cursor-pointer">
        </div>
        <div className="flex bg-black/20 h-5 w-20 items-center gap-1 cursor-pointer">
        </div>
      </div>
      {tampilan()}
    </>
  )
}