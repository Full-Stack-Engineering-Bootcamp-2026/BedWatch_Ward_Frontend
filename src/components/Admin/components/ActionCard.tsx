import React from "react";

type ActionCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="w-full max-w-[230px] h-[120px]  bg-white border border-gray-200 rounded-md p-5 flex flex-col justify-center gap-2 hover:shadow-sm transition-all cursor-pointer">
      <div className="text-blue-600 pt-1 text-xl">{icon}</div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 leading-none">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mt-2">{description}</p>
      </div>
    </div>
  );
};

export default ActionCard;
