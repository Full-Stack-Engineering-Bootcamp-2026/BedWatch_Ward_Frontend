import React from "react";

export default function Footer() {
  return (
    <footer className=" bottom-0 left-0 w-full border-0 bg-[#F4F2FC] flex items-center justify-between px-6 py-4 text-sm text-gray-500">
      <span className="flex gap-4">
        <span>Server: NHS-SOUTH-04</span>
        <span>Lat: 0.04ms</span>
        <span>Version: 4.2.0-STABLE</span>
      </span>

      <span>
        © 2026 BedWatch Health Systems. Confidential Operational Data.
      </span>
    </footer>
  );
}
