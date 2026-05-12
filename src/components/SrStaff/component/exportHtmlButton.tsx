import React from "react";

import { Button } from "@/components/ui/button";
import { FaFileExport } from "react-icons/fa";
import { toast } from "react-toastify";

import { exportHtmlToText } from "@/lib/exporthtmlTodocs";

type ExportHtmlButtonProps = {
  getHtml: () => string;
  fileName: string;
  label?: string;
  emptyMessage?: string;
  className?: string;
};
export default function ExportHtmlButton({
  getHtml,
  fileName,
  label = "Export",
  emptyMessage = "No data available to export",
  className = "flex items-center gap-2 border-gray-300 text-gray-700",
}: ExportHtmlButtonProps) {
  const handleExport = () => {
    try {
      const html = getHtml();

      if (!html.trim()) {
        toast.error(emptyMessage);
        return;
      }
      exportHtmlToText(html, fileName);
      toast.success("Export downloaded successfully");
    } catch (error) {
      toast.error("Failed to export file");
      console.error(error);
    }
  };
  return (
    <Button variant="outline" onClick={handleExport} className={className}>
      <FaFileExport />
      {label}
    </Button>
  );
}
