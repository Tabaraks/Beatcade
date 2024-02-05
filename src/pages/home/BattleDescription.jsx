import { useSnapshot } from "valtio";
import state from "../../store";

export const BattleDescription = () => {
  const snap = useSnapshot(state);
  return (
    <>
      <div className="absolute w-[28vw] top-[50%] translate-y-[-50%] left-[18vw] flex flex-col ">
        <div className="flex flex-row w-[80%] justify-between text-cyan-200 text-[1.2vw] font-normal font-['Atyp Display'] leading-snug drop-shadow-[0_0_8.2px_#26FFE5]">
          <p>CREATOR</p>
          <p>#182</p>
        </div>

        <div className="text-[4.1vw] text-cyan-200 font-bold font-['Atyp Display'] leading-snug drop-shadow-[0_0_8.2px_#26FFE5]">
          DA GENIE
        </div>

        <div className="text-white text-[1.2vw] font-bold font-['Inter'] leading-2 pt-[5%]">
          Explore a galaxy of royalty-free sonics meticulously crafted by
          award-winning composers and sample makers
        </div>

        <div className="flex flex-row justify-between w-[80%] pt-[5%]">
          <div className="flex flex-col">
            <div className="text-white text-[1.2vw] font-normal font-['Inter'] leading-snug">
              Beat Score
            </div>
            <div className="h-6 text-orange-200 text-[2.3vw] font-normal font-['Atyp Display'] leading-snug drop-shadow-[0_0_8.2px_#FF6726]">
              76%
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-white text-[1.2vw] font-normal font-['Inter'] leading-snug">
              A&R Score
            </div>
            <div className="text-cyan-200 text-[2.3vw] font-normal font-['Atyp Display'] leading-snug drop-shadow-[0_0_8.2px_#26FFE5]">
              37%
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-[10%] top-[20%] xl:right-[18%] xl:top-[15%]">
        <div className="flex gap-x-2 items-center">
          <img
            src="/images/icon/trophy.png"
            className="w-[30px] h-[30px] xl:w-[53px] xl:h-[53px] object-contain"
          />
          <p className="drop-shadow-[0_0_8.2px_#F9FFAF] text-[#F9FFAF] font-['Atyp Display'] font-bold text-[20px]">
            MOGUL
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <img
            src="/images/icon/hot.png"
            className="w-[50px] h-[50px] xl:w-[53px] xl:h-[53px] object-contain"
          />
          <p className="drop-shadow-[0_0_8.2px_#FFCCAF] font-['Atyp Display'] font-bold text-[22px] text-[#FFCCAF]">
            HOT
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <img
            src="/images/icon/master.png"
            className="w-[50px] h-[50px] xl:w-[53px] xl:h-[53px] object-contain"
          />
          <p className="drop-shadow-[0_0_8.2px_#F9AFFF] font-['Atyp Display'] font-bold text-[22px] text-[#F9AFFF]">
            MASTER
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <img
            src="/images/icon/pro.png"
            className="w-[50px] h-[50px] xl:w-[53px] xl:h-[53px] object-contain"
          />
          <p className="drop-shadow-[0_0_8.2px_#AFB7FF] font-['Atyp Display'] font-bold text-[22px] text-[#AFB7FF]">
            PRO
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <img
            src="/images/icon/talent.png"
            className="w-[50px] h-[50px] xl:w-[53px] xl:h-[53px] object-contain"
          />
          <p className="drop-shadow-[0_0_8.2px_#AFFFCA] font-['Atyp Display'] font-bold text-[22px] text-[#AFFFCA]">
            TALENT
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <img
            src="/images/icon/creator.png"
            className="w-[50px] h-[50px] xl:w-[53px] xl:h-[53px] object-contain"
          />
          <p className="drop-shadow-[0_0_8.2px_#AFF1FF] font-['Atyp Display'] font-bold text-[22px] text-[#AFF1FF]">
            CREATOR
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <img
            src="/images/icon/starter.png"
            className="w-[50px] h-[50px] xl:w-[53px] xl:h-[53px] object-contain"
          />
          <p className="drop-shadow-[0_0_8.2px_#FFFFFF] font-['Atyp Display'] font-bold text-[22px] text-[#FFFFFF]">
            STARTER
          </p>
        </div>
      </div>
    </>
  );
};
