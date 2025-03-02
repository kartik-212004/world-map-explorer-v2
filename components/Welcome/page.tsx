/**
 * Copyright (c) 2023-25 Zendalona
 * This software is licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { closeSound } from "@/app/utils/sounds";

interface WelcomeProps {
  onClose: () => void;
}

// Helper functions
const lockTabKey = (
  event: React.KeyboardEvent,
  firstElement: HTMLElement,
  lastElement: HTMLElement
) => {
  if (event.key === "Tab") {
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
};

const WelcomePage: React.FC<WelcomeProps> = ({ onClose }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus on message when component mounts
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.focus();
    }
  }, []);

  // Handle keyboard navigation within the disclaimer
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (messageRef.current && closeButtonRef.current) {
      lockTabKey(event, messageRef.current, closeButtonRef.current);
    }
  };

  // Handle closing the disclaimer
  const handleClose = () => {
    if (typeof window !== "undefined") {
      closeSound
        .play()
        .catch((error) => console.error("Error playing sound:", error));
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-[#f9edbe92]/50 text-white flex items-center justify-center backdrop-blur-sm z-[1005]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      onKeyDown={handleKeyDown}
    >
      <div className="bg-[#6f0e0e]/90 text-white  backdrop-blur-sm rounded-lg shadow-lg max-w-6xl w-full m-4">
        <div className="p-6 relative">
          <div
            ref={messageRef}
            id="messagec"
            aria-atomic="true"
            className="rounded"
          >
            <h1
              id="welcome-title"
              className="text-xl font-bold text-center mb-4"
            >
              Welcome to World-Map-Explorer
            </h1>
            <p className="mb-4 font-semibold">Please note the following:</p>

            <ol className="list-decimal font-medium pl-8 space-y-1 mb-4">
              <li className="pl-2">
                This application uses OpenStreetMap (OSM) data for map
                information. OSM is responsible for the maintenance and accuracy
                of the map.
              </li>

              <li className="pl-2">
                While using main features of map like searching and navigating
                using cursor, keep focus mode on or keep scan mode off.
              </li>

              <li className="pl-2">
                To navigate using marker, press TAB until focus on map (or{" "}
                <strong>ALT + M</strong>). Then make sure focus mode is on. Now
                you can navigate using arrow keys.
              </li>

              <li className="pl-2">
                To get all shortcuts press <strong>ALT + K</strong>.
              </li>

              <li className="pl-2">
                For users navigating markers with screen readers:
                <ul className="list-disc pl-8 mt-2">
                  <li>
                    For NVDA users, press <strong>NVDA Modifier+Space</strong>{" "}
                    to toggle Focus Mode.
                  </li>
                  <li>
                    For JAWS users, press <strong>Insert+Z</strong> to disable
                    Virtual Cursor.
                  </li>
                  <li>
                    For ORCA users, press <strong>ORCA Modifier+A</strong> to
                    toggle Focus Mode.
                  </li>
                  <li>
                    For VoiceOver users, press{" "}
                    <strong>Control+Option+Shift+U</strong> to interact with
                    cursor.
                  </li>
                </ul>
              </li>
            </ol>

            <p className="text-center">
              You can find more details in the{" "}
              <a className="text-blue-400" href="/help">
                User Guide.
              </a>
            </p>
            <p className="text-center mt-2">
              Thank you for using World-Map-Explorer!
            </p>
          </div>

          <button
            ref={closeButtonRef}
            onClick={handleClose}
            aria-label="Close Welcome Message"
            className="absolute top-4 right-4   text-white font-bold rounded-full w-8 h-8 flex items-center justify-center focus:outline-none  "
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
