import React from "react";

type CardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
            {value}
          </h2>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-[#1E40AF]">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Card;
