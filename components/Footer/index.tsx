"use client";

import { useMap } from "@/app/context/MapContext";

const Footer = () => {
  const { status, cameraHeight, elevation } = useMap();

  return (
    <footer className="fixed bottom-0 left-0 z-[1000] right-0 border border-black p-1 h-[22px] text-[11px] font-bold bg-[#683333] text-white">
      <div className="flex justify-between items-center">
        <span id="status-bar">{status}</span>
        <div className="flex gap-4">
          <span id="elevation">{elevation}</span>
          <span id="camera-height">{cameraHeight}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
