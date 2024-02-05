import { useSnapshot } from "valtio";
import state from "../../store";
import { Card } from "./Card";

import MyData from "../../config/data.json";

export const Menu = () => {
  const snap = useSnapshot(state);
  return (
    <div
      // className='absolute right-0 h-full border-[#ffffff13] border z-10 transition-all duration-1000'
      className="absolute right-0 h-full border-[#ffffff13] border z-20 overflow-y-scroll"
      style={{
        width: snap.enableMenu ? "auto" : "0px",
        background:
          "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,1) 100%)",
        display: snap.fullscreen ? "none" : "flex",
      }}
    >
      <div
        className="relative w-full pt-[80px] pr-[60px] pb-[205px] pl-[20px] flex flex-col gap-[34px]"
        style={{ visibility: snap.enableMenu ? "visible" : "hidden" }}
      >
        <div className="w-full h-[20px] flex flex-row items-center gap-[29px] text-white font-[Inter] text-[20px] font-[500] tracking-[-0.46px]">
          {snap.model === "Packs" && (
            <>
              <p>All</p>
              <p>VOYAGER</p>
              {/* <p className='font-[Whangarei] font-normal tracking-[-0.56px] text-[28px] text-[#B0FFFF] drop-shadow-lg'>TANIWHA</p> */}
              <p
                className="font-[Whangarei] font-normal h-fit tracking-[-0.56px] text-[35px] text-[#B0FFFF]"
                style={{ textShadow: "0px 0px 10px #B0FFFF" }}
              >
                TANIWHA
              </p>
            </>
          )}
          {snap.model === "Machines" && (
            <>
              <p>All</p>
              <p>Synths</p>
              {/* <p className='font-[Whangarei] font-normal tracking-[-0.56px] text-[28px] text-[#B0FFFF] drop-shadow-lg'>TANIWHA</p> */}
              <p
                className="font-[Whangarei] font-normal h-fit tracking-[-0.56px] text-[35px] text-[#B0FFFF]"
                style={{ textShadow: "0px 0px 10px #B0FFFF" }}
              >
                MPCs
              </p>
              <p>Sonics</p>
            </>
          )}
        </div>
        <div className=" w-auto grid grid-cols-3 gap-x-4 gap-y-6">
          {snap.model &&
            MyData.products[snap.model].map((product, index) => {
              return (
                <Card
                  name={product.menu_name}
                  colorName={product.colorName}
                  imgUrl={product.imgUrl}
                  key={index}
                  isSelected={product.id === snap.modelId}
                  onClickProps={() => {
                    state.modelId = product.id;
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
