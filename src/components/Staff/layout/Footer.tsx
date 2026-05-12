import React from "react";
export default function Footer() {
  return (
    <footer className="border-t bg-[#F4F2FC] flex items-center justify-between px-6 py-4 text-sm text-gray-500">
      {" "}
      <span className="gap-2 flex justify-evenly">
        Server: NHS-SOUTH-04
        <span className="gap-2">Lat: 0.04ms</span>
        <span className="gap-2">Version: 4.2.0-STABLE</span>
      </span>
      <span>
        © 2026 BedWatch Health Systems. Confidential Operational Data.
      </span>
    </footer>
  );
}
