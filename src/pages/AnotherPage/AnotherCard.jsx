import img2 from "../Library/img/Group 87.png";

const AnotherCard = ({ icon, title, completed }) => {
  return (
    <div>
      <div
        className="
          relative
          p-4
          w-[200px] h-[190px]
          bg-white
          border border-[#1c345816]
          rounded-[16px]
          flex flex-col
          cursor-pointer
          transition-all duration-300
          shadow-[0_5px_15px_rgba(0,0,0,0.12)]
          hover:shadow-[0_0_20px_rgba(0,0,0,0.38)]
        "
      >
        <div
          className="
            w-[50px] h-[50px]
            mb-4
            bg-[#E1ECF7]
            rounded-[10px]
            flex items-center justify-center
            shadow-[inset_0_0_5px_rgba(0,0,0,0.18)]
          "
        >
          <img src={icon} alt={title} className="w-8 h-8 object-contain" />
        </div>

        <p className="text-[12px] leading-snug text-black">{title}</p>

        <div className="absolute right-4 bottom-4">
          {completed ? (
            <div
              className="
        w-[30px] h-[30px]
        rounded-full
        bg-green-500
        shadow-[0_0_8px_rgba(34,197,94,0.9),0_0_20px_rgba(34,197,94,0.6)]
        animate-pulse
      "
            />
          ) : (
            <img src={img2} alt="Статус" className="w-[30px] h-[30px]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnotherCard;
