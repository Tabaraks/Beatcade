import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../../store";
import { Card } from "./Card";

import MyData from "../../config/data.json";

export const Menu = () => {
  const snap = useSnapshot(state);
  const menuRef = useRef(null);

  useEffect(() => {
    if (snap.enableMenu) {
      menuRef.current.classList.add("menu-open");
    } else {
      menuRef.current.classList.remove("menu-open");
    }
  }, [snap.enableMenu]);

  


  const cardAnimation = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={menuRef}
      id="menu"
      className="absolute right-0 h-full border-[#ffffff13] border z-20 overflow-y-scroll"
      style={{
        width: snap.enableMenu ? "auto" : "0px",
        background:
          "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,1) 100%)",
        display: snap.fullscreen ? "none" : "flex",
      
      }}
     
      initial={{ x: "100vw" }} // Initial position outside the viewport
      animate={{ x: snap.enableMenu ? 0 : "100vw" }}  
      transition={{ type: "spring", stiffness: 80, damping: 20 }} 
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
                <motion.div
                  key={index}
                  initial={{ y: "200%" }} 
                  animate={{ y: snap.enableMenu ? "0.4%" : "100%" }}  
                  transition={{ type: "spring", stiffness: 100, damping: 30,delay:0.3 }} 
                >
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
                </motion.div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
};
