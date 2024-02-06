import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import * as Tone from "tone";
import state, { PAGES } from "../../store";
import { CustomButton } from "../../components";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../../config/motion";
import { Menu } from "./Menu";
import { Card } from "./Card";
import MyData from "../../config/data.json";
import { useEffect, useState } from "react";
import { BattleDescription } from "./BattleDescription";

const Home = () => {
  const [dropTime, setDropTime] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const imageNames = [
    "Gold Play",
    "Purple Play",
    "Blue Play",
    "Green Play",
    "White Play",
  ];

  const [audioName, setAudioName] = useState("");

  const [currentIndex, setCurrentIndex] = useState(null);

  const [startTime, setStartTime] = useState(null);

  const [isPlaying, setIsPlaying] = useState({
    gold: false,
    blue: false,
    purple: false,
    green: false,
    white: false,
  });

  const iconic = {
    "Gold Play": "IO.wav",
    "Purple Play": "Kerberos.wav",
    "Blue Play": "Luna.wav",
    "Green Play": "Lapetus.wav",
    "White Play": "Deimos.wav",
  };

  const legendary = {
    "Gold Play": "Saw-1.wav",
    "Purple Play": "Saw-2.wav",
    "Blue Play": "Saw-3.wav",
    "Green Play": "Saw-4.wav",
    "White Play": "Saw-5.wav",
  };

  const epic = {
    "Gold Play": "Neso.wav",
    "Purple Play": "sem.wav",
    "Blue Play": "rhea.wav",
    "Green Play": "ariel.wav",
    "White Play": "tital.wav",
  };

  const rare = {
    "Gold Play": "FullMix1.wav",
    "Purple Play": "Fullmix2.wav",
    "Blue Play": "Keysstem.wav",
    "Green Play": "Percstem.wav",
    "White Play": "FullMix.wav",
  };

  const common = {
    "Gold Play": "HiHatStem3.wav",
    "Purple Play": "KeysStem3.wav",
    "Blue Play": "KickStem3.wav",
    "Green Play": "PercStem3.wav",
    "White Play": "BassStem3.wav",
  };

  useEffect(() => {
    setInterval(() => {
      const tempDropTime = { day: 0, hour: 0, minute: 0, second: 0 };
      const now = new Date();

      tempDropTime.day = 6 - now.getDay();
      if (tempDropTime.day < 0) tempDropTime.day = 0;

      tempDropTime.hour = 23 - now.getHours();
      if (tempDropTime.hour < 0) tempDropTime.hour = 0;

      tempDropTime.minute = 59 - now.getMinutes();
      if (tempDropTime.minute < 0) tempDropTime.minute = 0;

      tempDropTime.second = 59 - now.getSeconds();
      if (tempDropTime.second < 0) tempDropTime.second = 0;

      setDropTime(tempDropTime);
    }, 1000);
  }, []);
  const snap = useSnapshot(state);
  const [modelState, setModelState] = useState(null, null);

  const switchMenu = () => {
    state.enableMenu = !snap.enableMenu;
  };
  const switchDisappear = () => {
    state.disappear = !snap.disappear;
  };
  const switchFullscreen = () => {
    state.fullscreen = !snap.fullscreen;
  };
  const goHomePage = () => {
    window.location = "/";
  };

  const setModelData = () => {
    console.log("kky", "setdata", snap);
    if (!snap.model || !snap.modelId) return;
    const array = MyData.products[snap.model];
    const model = array.find((el) => el.id === snap.modelId);
    if (!model) return;
    const color = MyData.colors[model.colorName];
    setModelState({
      type: snap.model,
      title: model.title,
      name: model.name,
      subName:model.subName,
      description: model.description,
      subDescription: model.subDescription,
      color: color,
      imgUrl: model.imgUrl,
      colorName: model.colorName,

    });
  };

  useEffect(() => {
    setModelData();
  }, [snap.modelId, snap.model]);

  // useEffect(() => {
  //   console.log("kky", modelState);
  // }, [modelState])

  const playAudio = (imageName) => {
    const audioPath =
      snap.model === "Packs" && modelState.colorName === "iconic"
        ? iconic[imageName]
        : modelState.colorName === "legendary"
        ? legendary[imageName]
        : modelState.colorName === "epic"
        ? epic[imageName]
        : modelState.colorName === "rare"
        ? rare[imageName]
        : modelState.colorName === "common"
        ? common[imageName]
        : rare[imageName];
    setAudioName(audioPath);
    if (audioPath) {
      if (currentPlayer) {
        currentPlayer.stop();
        setProgress(0);
        setStartTime(null);
      }

      let player;

      player = new Tone.Player(`/sampler/MP3s/${audioPath}`).toDestination();
      player.autostart = true;
      setCurrentPlayer(player);
      setStartTime(Tone.now());
    } else {
      console.error("No audio mapping found for image:", imageName);
    }
  };

  const handleClick = (imageName) => {
    if (isPlaying[imageName]) {
      setIsPlaying((prevState) => ({
        ...prevState,
        [imageName]: false,
      }));
      if (currentPlayer) {
        currentPlayer.stop();
        setCurrentPlayer(null);
      }
    } else {
      Object.keys(isPlaying).forEach((key) => {
        if (isPlaying[key]) {
          setIsPlaying((prevState) => ({
            ...prevState,
            [key]: false,
          }));
        }
      });

      playAudio(imageName);

      setIsPlaying((prevState) => ({
        ...prevState,
        [imageName]: true,
      }));
    }
  };
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % imageNames.length;
    const nextImage = imageNames[nextIndex];
    handleClick(nextImage);
    setCurrentIndex(nextIndex);
    if (nextImage === "Gold Play") {
      setIsPlaying((prev) => ({
        ...prev,
        gold: true,
      }));
    } else if (nextImage === "Purple Play") {
      setIsPlaying((prev) => ({
        ...prev,
        purple: true,
      }));
    } else if (nextImage === "Blue Play") {
      setIsPlaying((prev) => ({
        ...prev,
        blue: true,
      }));
    } else if (nextImage === "Green Play") {
      setIsPlaying((prev) => ({
        ...prev,
        green: true,
      }));
    } else if (nextImage === "White Play") {
      setIsPlaying((prev) => ({
        ...prev,
        white: true,
      }));
    }
  };

  const handlePrevious = () => {
    const previousIndex =
      (currentIndex - 1 + imageNames.length) % imageNames.length;
    const previousImage = imageNames[previousIndex];
    handleClick(previousImage);
    setCurrentIndex(previousIndex);
    if (previousImage === "Gold Play") {
      setIsPlaying((prev) => ({
        ...prev,
        gold: true,
      }));
    } else if (previousImage === "Purple Play") {
      setIsPlaying((prev) => ({
        ...prev,
        purple: true,
      }));
    } else if (previousImage === "Blue Play") {
      setIsPlaying((prev) => ({
        ...prev,
        blue: true,
      }));
    } else if (previousImage === "Green Play") {
      setIsPlaying((prev) => ({
        ...prev,
        green: true,
      }));
    } else if (previousImage === "White Play") {
      setIsPlaying((prev) => ({
        ...prev,
        white: true,
      }));
    }
  };

  const togglePlay = () => {
    if (currentPlayer) {
      if (isPlaying) {
        currentPlayer.stop();
        setStartTime(null);
      } else {
        currentPlayer.start();
        setStartTime(Tone.now() - startTime);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!startTime || !currentPlayer) return;

      const currentPosition = Tone.now() - startTime;
      const duration = currentPlayer.buffer.duration;
      const percentage = (currentPosition / duration) * 100;

      setProgress(percentage);
    };

    const interval = setInterval(updateProgress, 100);

    return () => clearInterval(interval);
  }, [currentPlayer, startTime]);

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (snap.enableMenu) {
        const menu = document.getElementById("menu");
        const menuButton = document.getElementById("menu-button");
        if (
          menu &&
          !menu.contains(event.target) &&
          !menuButton.contains(event.target)
        ) {
          state.enableMenu = !snap.enableMenu;
        }
      }
    };

    if (snap.enableMenu) {
      document.addEventListener("click", handleClickOutsideMenu);
    }
    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, [snap.enableMenu]);

  return (
    <AnimatePresence>
      <div className="absolute w-full h-full pl-[2.2vw] pr-[5.2vw] pt-[4.6vh] pb-[4.8vh] z-20 pointer-events-none">
        <div className="relative h-full ">
          <motion.div {...slideAnimation("left")}>
            <div className="absolute flex flex-row gap-[8px] items-center ">
              {/* <p className='text-white text-[60px] font-medium tracking-[20px] cursor-pointer pointer-events-auto'
                onClick={goHomePage}
              >BEATCADE™</p> */}
              <img
                className="w-[25vw] object-contain cursor-pointer pointer-events-auto"
                style={snap.fullscreen ? { opacity: 0.3 } : { opacity: 1 }}
                src="/images/logo.svg"
                alt="logo"
                onClick={goHomePage}
              />
            </div>
          </motion.div>

          <motion.div
            {...slideAnimation("up")}
            className="absolute bottom-0 flex flex-col gap-[0]"
            style={{ display: snap.fullscreen ? "none" : "flex" }}
          >
            <motion.div {...headTextAnimation}>
              <p className="text-white font-[G7 Silkworm TTF] leading-3 text-[1vw] font-normal  tracking-[-0.36px]">
                BHaruMusic Presents
              </p>
              <div className="flex  items-center gap-[1rem]">
                <p className="text-[#ADDFFF] font-[Whangarei] leading-[4vw] text-[4vw] font-normal  tracking-[-1.52px]">
                  VOYAGER
                </p>
                <div className=" flex flex-col  items-center">
                  <p className="text-[#ADDFFF] text-[17px] font-[Whangarei] font-normal tracking-[-0.72px] leading-[0px] uppercase">
                    Next Drop
                  </p>
                  \
                  <p className="text-[#fff] text-[12px] font-normal tracking-[-0.46px] leading-[0px] ">
                    {dropTime.day}d {dropTime.hour}h {dropTime.minute}m{" "}
                    {dropTime.second}s
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...headContentAnimation}
              className="flex flex-row gap-[1.5vw]"
            >
              <CustomButton
                type="outline"
                title="JOIN NOW"
                // handleClick={() => state.subscribing = true}
                customStyles="outl font-bold"
                icon="trophy"
                iconPos="start"
              ></CustomButton>

              <CustomButton
                type="filled"
                title="START TOUR"
                // handleClick={() => state.page = PAGES.customize}
                customStyles="fill font-bold"
                icon="play"
                iconPos="end"
              />
            </motion.div>
          </motion.div>

          <motion.div
            {...slideAnimation("down")}
            className="absolute right-0 top-0 flex flex-row gap-[23px] items-center"
            style={{ visibility: snap.fullscreen ? "hidden" : "visible" }}
          >
            {MyData.models.map((name) => (
              <p
                className="text-white font-[Inter] text-[1.2vw] font-bold tracking-[-0.46px] cursor-pointer pointer-events-auto"
                style={
                  snap.model === name
                    ? { textShadow: "0px 0px 10px #B0FFFF" }
                    : {}
                }
                key={name}
                onClick={() => {
                  state.model = name;
                }}
              >
                {name}
              </p>
            ))}
            <p className="text-white font-[Inter] text-[1.2vw] font-bold tracking-[-0.46px] cursor-pointer pointer-events-auto px-[0.8vw] py-[0.3vw] border border-white rounded-[0.8vw]">
              BUILDER
            </p>
          </motion.div>

          <motion.div
            {...slideAnimation("right")}
            className="absolute right-0 bottom-0 flex flex-col gap-[1.5vw] items-end"
            style={{ display: snap.fullscreen ? "none" : "flex" }}
          >
            <div style={{ display: snap.enableMenu ? "none" : "flex" }}>
              <img
                src="/images/Xbox Controller Outline 2.png"
                alt="xbox"
                className="object-contain w-[7.4vw]"
              />
            </div>

            <p className="text-white font-[Inter] font-bold tracking-[-0.32px] text-[1.2vw]">
              Welcome to <span className="text-[#8BC5FA]">Season 1</span>
            </p>
            <p className="text-[#525252] drop-shadow-[0_3px_4px_rgba(0,0,0,0.69)] font-[Inter] text-[1vw] font-bold tracking-[-0.32px]">
              Beatcade Studios © 2023. Pre-alpha V 0.3.27
            </p>
          </motion.div>
        </div>
      </div>

      <Menu />

      <div
        className="fixed right-0 w-[3.7vw] h-full bg-black border-[#ffffff13] border z-20  pt-[5vh] pb-[12vh] px-[0.8vw] flex flex-col items-center justify-between"
        style={{
          right: snap.disappear ? "-3.7vw" : "0px",
          visibility: snap.fullscreen ? "hidden" : "visible",
        }}
      >
        <div
          id="menu-button"
          className="flex flex-col h-[30vh] justify-between"
        >
          <img
            className="w-[30px] object-contain cursor-pointer"
            src="/images/menu-icons/menu-01.png"
            onClick={switchMenu}
            alt="menu"
          />
          <img
            className="w-[30px] object-contain cursor-pointer"
            src="/images/menu-icons/flash.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain cursor-pointer w-[32px] h-[33.907px]"
            src="/images/menu-icons/bell-03.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain cursor-pointer"
            src="/images/menu-icons/user-01.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain cursor-pointer"
            src="/images/menu-icons/heart.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain cursor-pointer"
            src="/images/menu-icons/search-md.png"
            alt="menu"
          />
        </div>

        <div className="h-[12vh]"></div>

        <div className="flex flex-col h-[6vh] items-center justify-between">
          <img
            className="w-[4vw] max-w-none"
            src="/images/menu-icons/chevron-right.png"
            alt="menu"
          />
          <p className="text-white font-[Inter] text-[1vw] font-bold tracking-[-0.7px]">
            1/3
          </p>
        </div>

        <div className="h-[11vh]"></div>

        <div className="flex flex-col h-[7vh] justify-between">
          <img
            className="w-[30px] object-contain"
            src="/images/menu-icons/recording-03.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain"
            src="/images/menu-icons/camera-01.png"
            alt="menu"
          />
        </div>

        <div className="h-[9vh]"></div>

        <div className="flex flex-col h-[13vh] justify-between">
          <img
            className="w-[30px] object-contain"
            src="/images/menu-icons/Discord Icon SVG 1.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain"
            src="/images/menu-icons/message-chat-circle.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain w-[32px] h-[33.907px]"
            src="/images/menu-icons/settings-01.png"
            alt="menu"
          />
        </div>
      </div>

      <div
        className="absolute flex flex-col right-0 bottom-0 z-30 w-[3.7vw] h-[8vh] items-center justify-between px-[0.8vw] pb-[1vh]"
        style={snap.fullscreen ? { opacity: 0.5 } : { opacity: 1 }}
      >
        <img
          className="w-[30px] object-contain aspect-square cursor-pointer"
          // src={snap.fullscreen ? '/images/menu-icons/fullscreen-close.png' : '/images/menu-icons/fullscreen-open.png'}
          src="/images/menu-icons/maximize-01.png"
          alt="fullscreen"
          onClick={switchFullscreen}
        />
        <img
          className="w-[30px] object-contain cursor-pointer aspect-square"
          src={
            snap.disappear
              ? "/images/menu-icons/collapse-left.png"
              : "/images/menu-icons/collapse-right.png"
          }
          alt="disappear"
          onClick={switchDisappear}
        />
      </div>

      {(snap.model === "Packs" || snap.model === "Machines") && (
        <div className="absolute flex flex-col left-[0%] top-[49%] translate-y-[-50%] items-center z-40">
          <img
            className="w-[6vh] cursor-pointer"
            src={`${
              isPlaying.gold
                ? "/images/icon/Gold Stop.png"
                : "/images/icon/Gold Play.png"
            }`}
            alt="Gold Play"
            onClick={() => {
              handleClick("Gold Play");
              setIsPlaying((prevState) => ({
                ...prevState,
                gold: !prevState.gold,
              }));
            }}
          />
          <img
            className="w-[6vh] cursor-pointer"
            src={`${
              isPlaying.purple
                ? "/images/icon/Purple Stop.png"
                : "/images/icon/Purple Play.png"
            }`}
            alt="Purple Play"
            onClick={() => {
              handleClick("Purple Play");
              setIsPlaying((prevState) => ({
                ...prevState,
                purple: !prevState.purple,
              }));
            }}
          />
          <img
            className="w-[6vh] cursor-pointer"
            src={`${
              isPlaying.blue
                ? "/images/icon/Blue Stop.png"
                : "/images/icon/Blue Play.png"
            }`}
            alt="Blue Play"
            onClick={() => {
              handleClick("Blue Play");
              setIsPlaying((prevState) => ({
                ...prevState,
                blue: !prevState.blue,
              }));
            }}
          />
          <img
            className="w-[6vh] cursor-pointer"
            src={`${
              isPlaying.green
                ? "/images/icon/Green Stop.png"
                : "/images/icon/Green Play.png"
            }`}
            alt="Green Play"
            onClick={() => {
              handleClick("Green Play");
              setIsPlaying((prevState) => ({
                ...prevState,
                green: !prevState.green,
              }));
            }}
          />
          <img
            className="w-[6vh] cursor-pointer"
            src={`${
              isPlaying.white
                ? "/images/icon/White Stop.png"
                : "/images/icon/White Play.png"
            }`}
            alt="White Play"
            onClick={() => {
              handleClick("White Play");
              setIsPlaying((prevState) => ({
                ...prevState,
                white: !prevState.white,
              }));
            }}
          />

          {modelState && (
            <Card
              name={modelState.name}
              colorName={modelState.colorName}
              imgUrl={modelState.imgUrl}
              customClass={"scale-[0.5]"}
            />
          )}
        </div>
      )}
      <div className="flex-col absolute right-[45%] top-[77%] z-50">
        <p className="text-white font-bold text-[19px] mb-0 text-center">
          {audioName.includes(".")
            ? audioName.substring(0, audioName.indexOf("."))
            : audioName}
        </p>
        <p className="text-white text-[13px] mb-0 text-center">
          { ` Artist Name: ${audioName.includes(".")
            ? audioName.substring(0, audioName.indexOf("."))
            : audioName}`}
        </p>
        <div className="w-full h-1 bg-gray-200 rounded overflow-hidden mt-2">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex mt-2 gap-x-3">
          <img
            src="/images/icon/prev.svg"
            className="w-[5vh] cursor-pointer"
            onClick={handlePrevious}
          />
          <img
            src={`${
              !isPlaying ? "/images/icon/play.svg" : "/images/icon/pause.svg"
            }`}
            className="w-[6vh] cursor-pointer"
            onClick={togglePlay}
          />
          <img
            src="/images/icon/next.svg"
            className="w-[5vh] cursor-pointer"
            onClick={handleNext}
          />
        </div>
      </div>

      {snap.model === "Packs" && snap.enableMenu === false && modelState && (
        <div className="absolute flex flex-col left-[52vw] top-[25vh] xl:top-[30vh] w-[34vw] xl:w-[27vw] gap-[0px]">
          <p
            className={
              "font-[Whangarei] text-[26px] font-normal tracking-[-0.72px] leading-[22px]"
            }
            style={{ color: modelState.color }}
          >
            {modelState.title}
          </p>
          <div className="flex gap-[2.5rem] items-center">

         
          <p
            className={
              "font-[Whangarei]  lg:text-[70px] xl:text-[70px] font-normal tracking-[-1.92px] leading-[72px] uppercase"
            }
            style={{ color: modelState.color }}
          >
            {modelState.name}{" "}
          </p>
          <p
            className={
              "font-[Whangarei]  text-[25px] font-normal tracking-[-1.92px] leading-[26px] uppercase"
            }
            style={{ color: modelState.color }}
          >
            {modelState.subName}{" "}
          </p>
          </div>
          <p className="text-white font-[Inter] text-[12px] lg:text-[10px] xl:text-[15px] font-bold tracking-[-0.46px] leading-[18px]">
            {modelState.description}
          </p>
          <p className="text-white font-[Inter] text-[12px] mt-[10px] xl:text-[17px] font-bold tracking-[-0.34px] leading-[36px]">
            {modelState.subDescription}
          </p>
        </div>
      )}

      {snap.model === "Battles" && <BattleDescription />}
    </AnimatePresence>
  );
};

export default Home;
