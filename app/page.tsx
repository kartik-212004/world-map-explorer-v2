"use client";

import Navbar from "../components/Navbar";
import dynamic from "next/dynamic";
import { useState } from "react";
import Footer from "../components/Footer";
import Welcome from "../components/Welcome/page";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});

export default function Home() {
  const [mapType, setMapType] = useState<"default" | "geopolitical">("default");
  const [showWelcome, setShowWelcome] = useState(true);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  return (
    <main className="max-h-screen relative">
      {showWelcome && <Welcome onClose={handleCloseWelcome} />}
      <Navbar onMapTypeChange={setMapType} />
      <div className="">
        <Map mapType={mapType} />
      </div>
      <Footer />
    </main>
  );
}
