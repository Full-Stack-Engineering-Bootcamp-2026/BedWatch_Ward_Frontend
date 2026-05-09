import { FaArrowRight } from "react-icons/fa6";

const ReportCard = () => {
  return (
    <div className="flex h-full min-h-[117px] cursor-pointer items-center justify-between rounded-md bg-[#1E3A8A] p-6 text-white transition-all">
      <div>
        <h3 className="text-xl font-semibold">View Detailed Reports</h3>

        <p className="mt-1 text-sm text-blue-100">Analytics and history logs</p>
      </div>

      <FaArrowRight className="text-2xl" />
    </div>
  );
};

export default ReportCard;
