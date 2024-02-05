import MyData from "../../config/data.json";

const VectorIcon = ({ color }) => {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 21 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-2 left-6"
    >
      <path
        id="Vector"
        d="M14.6794 0.888355L0.752883 15.044C0.0607668 15.7473 0.704994 16.9176 1.6709 16.712L5.30725 15.9379C6.036 15.7828 6.66838 16.4487 6.47767 17.1662L4.43462 24.7821C4.16982 25.7702 5.39141 26.4625 6.10898 25.7332L20.0355 11.5776C20.7276 10.8743 20.0833 9.70392 19.1174 9.90953L15.4811 10.6836C14.7523 10.8387 14.12 10.1729 14.3107 9.45537L16.3537 1.83944C16.6185 0.851342 15.3969 0.159064 14.6794 0.888355Z"
        fill={color}
      />
      <defs>
        <linearGradient
          id="paint0_linear_63_1680"
          x1="6.80058"
          y1="25.1973"
          x2="14.6761"
          y2="-1.11203"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFDC4A" />
          <stop offset="1" stop-color="#F37322" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Card = ({
  name,
  colorName,
  imgUrl,
  isSelected,
  onClickProps,
  customClass,
}) => {
  const color = MyData.colors[colorName];

  return (
    <div
      className={`relative w-[163px] flex flex-col items-center h-fit gap-[5vh] cursor-pointer ${customClass}`}
      onClick={onClickProps}
    >
      <VectorIcon color={color} />
      <div
        className="w-[10vw] h-[20vh] flex flex-col border"
        style={
          isSelected
            ? { boxShadow: `0px 0px 25px 3px ${color}`, borderColor: color }
            : { borderColor: "#333" }
        }
      >
        <div className="h-[142px] flex justify-center items-center ">
          <img
            src={imgUrl}
            width={"72px"}
            // style={{ boxShadow: `0px 1px 21.2px 0px ${color}` }}
            alt="iconic"
            className="object-contain max-w-[90%] max-h-[90%] "
          ></img>
        </div>
        <div
          className=" w-full  font-[14px] text-center text-black uppercase"
          style={{ backgroundColor: color }}
        >
          {colorName}
        </div>
      </div>

      <div className="font-[14px] text-center uppercase" style={{ color }}>
        {name}
      </div>
    </div>
  );
};
