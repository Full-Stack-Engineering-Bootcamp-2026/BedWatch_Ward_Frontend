import React from "react";

type CardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="w-full min-h-[130px] md:h-[146px] font-inter bg-white border border-gray-200 rounded-lg p-4 md:px-5 md:py-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-500 text-sm font-medium tracking-wide">
          {title}
        </h3>

        <div className="text-blue-600 text-xl md:text-2xl">{icon}</div>
      </div>
      <div className="text-2xl md:text-[30px] leading-none font-semibold text-gray-900">
        {value}
      </div>
      <p className="text-sm font-semibold text-gray-400 mt-1">
        This is temporary text
      </p>
    </div>
  );
};

export default Card;
