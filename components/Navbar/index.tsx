"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import LoginModal from "../LoginModal";
import UserMenu from "../UserMenu";

interface NavbarProps {
  onMapTypeChange: (type: "default" | "geopolitical") => void;
}

const Navbar = ({ onMapTypeChange }: NavbarProps) => {
  const session = useSession();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Get user's name or email to display
  const displayName = session.data?.user?.name || 
                     session.data?.user?.email?.split('@')[0] || 
                     'User';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-white text-[#6F0E0E] border-b-2 border-[#A04242]">
        <div className="header-content flex flex-row items-center justify-between h-full px-4 sm:px-6">
          <div className="logo flex items-center">
            <Image
              src="/map-logo.png"
              alt="Map Logo"
              width={40}
              height={40}
              className="map-logo"
              tabIndex={-1}
            />
            <p id="map-explorer-text" tabIndex={0} className="ml-2 font-bold">
              World-Map-Explorer
            </p>
          </div>

          <div className="header-icons flex items-center h-full space-x-4">
            {session.data?.user ? (
              <UserMenu userName={displayName} />
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-[#A04242] font-bold border-2 border-[#A04242] rounded-lg px-4 py-1 hover:bg-[#A04242] hover:text-white transition-colors"
              >
                Login
              </button>
            )}

            <button
              title="Help"
              id="help-btn"
              tabIndex={0}
              aria-label="select for read user manual"
              onClick={() => router.push("/help")}
              className="text-[#A04242] font-bold border-2 border-[#A04242] rounded-lg px-4 py-1 hover:bg-[#A04242] hover:text-white transition-colors"
            >
              Help{" "}
              <i className="fa fa-question-circle" aria-hidden="true">
                <FontAwesomeIcon icon={faQuestionCircle} />{" "}
              </i>
            </button>
          </div>
        </div>
      </header>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

export default Navbar;
