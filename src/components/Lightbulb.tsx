import { useState } from "react";

export default function Lightbulb() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={`bubble inline-block text-sm leading-none cursor-pointer ${show ?'bg-gray-200' : 'bg-[#fff] '} rounded-[5px] text-secdonary py-[4px] px-[8px] hover:bg-gray-100 transition`} onClick={() => setShow(!show)}>
        膚況建議
      </div>
      {show ? (
        <div
          className="static mt-[20px] md:mt-0 md:absolute z-50 md:top-[30px] md:left-[85%] md:-translate-x-1/2 md:shadow-xl p-4 md:w-80 text-xs transition duration-200"
        >
          <div className="relative w-72 h-60 mx-auto border rounded-lg bg-white shadow-sm">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300"></div>
            <div className="absolute left-1/2 top-0 h-full w-px bg-gray-300"></div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full pr-3">敏感</div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-full pl-3">正常</div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-3">油性</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-3">乾性</div>
            <QuadrantContent />
          </div>
        </div>
      ):null}
    </>
  );
}

function QuadrantContent() {
  return (
    <>
      <div className="absolute top-0 left-0 w-1/2 h-1/2 flex flex-col items-center justify-center text-center p-2 text-base">
        <ul className="space-y-0.5 ">
          <li> 嫩膚安撫</li>
          <li> 煥采更新</li>
          <li> 逆時活妍</li>
        </ul>
      </div>

      <div className="absolute top-0 left-1/2 w-1/2 h-1/2 flex flex-col items-center justify-center text-center p-2 text-base">
        <ul className="space-y-0.5">
          <li> 3D緊緻</li>
          <li> 鎮靜修護</li>
          <li> 金燦珍顏</li>
        </ul>
      </div>

      <div className="absolute top-1/2 left-0 w-1/2 h-1/2 flex flex-col items-center justify-center text-center p-2 text-base">
        <ul className="space-y-0.5">
          <li> 海洋舒潤</li>
          <li> 白皙晶瑩</li>
          <li> 膠原煥活</li>
        </ul>
      </div>

      <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 flex flex-col items-center justify-center text-center p-2 text-base">
        <ul className="space-y-0.5">
          <li> 雪妍瓷肌</li>
          <li> 煥采更新</li>
        </ul>
      </div>
    </>
  );
}
