import React, { useState } from "react";
import { useSnapshot } from "valtio";
import state, { PAGES } from "../store";

const CustomButton = ({
  type,
  title,
  customStyles,
  handleClick,
  icon,
  iconPos,
}) => {
  const snap = useSnapshot(state);
  const [hovered, setHovered] = useState(false);

  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        // color: "white",
        backgroundColor: snap.color,
        borderColor: snap.color,
        // borderWidth: "7px",
        // borderRadius: "25px"
      };
    } else if (type === "outline") {
      return {
        // color: "black",
        backgroundColor: "white",
        borderColor: snap.color,
        // borderWidth: "7px",
        // borderRadius: "25px"
      };
    }
  };

  return (
    <button
      className={`w-[12vw] h-[3.3vw] p-[0.6vw 0.83px] justify-center align-center gap-[0.5vw] flex items-center ${customStyles} border-[0.36vw] rounded-[1.2vw] text-[1.2vw]`}
      style={generateStyle(type)}
      onClick={() => {
        title === "JOIN NOW" ? (state.page = PAGES.joinus) : handleClick;
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon && iconPos === "start" && <i>{getIcon(icon, hovered)}</i>}
      {title}
      {icon && iconPos === "end" && <i>{getIcon(icon, hovered)}</i>}
    </button>
  );
};

const getIcon = (name, hovered) => {
  if (name === "trophy") {
    return (
      <svg
        className="w-[1.2vw]"
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <g id="Group_2">
            <g id="Group_3">
              <g id="Group_4">
                <path
                  id="button-icon"
                  style={{ transition: "all 0.4s ease-in-out" }}
                  d="M25.9971 2.7583C26.0302 2.04114 25.7765 1.33502 25.28 0.816458C24.7835 0.297897 24.0884 0 23.3712 0H21.308H19.3772H16.3431H14.6881H11.323H9.66797H6.6228H4.70302H2.62878C1.91162 0 1.21653 0.297897 0.720032 0.816458C0.223537 1.33502 -0.0302267 2.04114 0.00287292 2.7583C0.102172 4.74428 0.587633 6.56476 1.43719 8.15355C2.13228 9.44443 3.04804 10.5809 4.18446 11.5297C4.38306 11.6952 4.57062 11.8386 4.75819 11.9821C4.85749 12.6772 5.03402 13.3502 5.30985 14.0011C5.71808 14.961 6.29181 15.8216 7.03103 16.5609C7.77026 17.3001 8.63085 17.8738 9.59074 18.282C10.3631 18.613 11.1795 18.8116 12.018 18.8889V20.7755C11.1685 20.9079 10.3741 21.2169 9.7121 21.6803C8.63085 22.4416 8.00195 23.578 8.00195 24.7696V26.7004H9.93277H16.0231H17.9539V24.7696C17.9539 23.5669 17.3361 22.4416 16.2438 21.6803C15.5928 21.2169 14.7984 20.9079 13.9489 20.7755V18.8889C14.7874 18.8116 15.6038 18.613 16.3762 18.282C17.3361 17.8738 18.1966 17.3001 18.9359 16.5609C19.6751 15.8216 20.2488 14.961 20.657 14.0011C20.9329 13.3502 21.1204 12.6772 21.2087 11.9821C21.3963 11.8386 21.5949 11.6952 21.7824 11.5297C22.9189 10.5809 23.8456 9.44443 24.5297 8.15355C25.4124 6.56476 25.8868 4.74428 25.9971 2.7583ZM18.8586 13.3392C17.9098 15.4906 15.7583 16.9912 13.2648 16.9912H12.7462C10.2417 16.9912 8.09022 15.4906 7.1524 13.3392C6.8214 12.5889 6.64487 11.7724 6.63384 10.9118C6.63384 10.9008 6.63384 10.8898 6.63384 10.8787V1.94185H9.66797H11.6208H14.4123H16.3651H19.3993V10.8787C19.3993 10.8898 19.3993 10.9008 19.3993 10.9118C19.3772 11.7724 19.1896 12.5889 18.8586 13.3392ZM1.93369 2.659C1.91162 2.26181 2.23158 1.93081 2.62878 1.93081H4.70302V9.37823C3.3349 7.96598 2.09918 5.83657 1.93369 2.659ZM16.0452 24.7696H9.95483C9.95483 23.6552 11.1464 22.7505 12.669 22.6291H13.331C14.8536 22.7505 16.0452 23.6552 16.0452 24.7696ZM24.0663 2.659C23.9008 5.83657 22.6651 7.96598 21.297 9.3672V1.93081H23.3712C23.7684 1.93081 24.0884 2.26181 24.0663 2.659Z"
                  fill={hovered ? "#043467" : "black"}
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
  if (name === "play") {
    return (
      <svg
        className="w-[1.4vw]"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="player-play">
          <path
            id="button-icon"
            d="M7 4V20L20 12L7 4Z"
            stroke={hovered ? "#043467" : "white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "all 0.4s ease-in-out" }}
          />
        </g>
      </svg>
    );
  }
};
export default CustomButton;
