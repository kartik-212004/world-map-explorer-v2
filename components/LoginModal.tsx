import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { LoginForm } from "./login-form";
import { closeSound } from "@/app/utils/sounds";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  const handleClose = () => {
    if (typeof window !== "undefined") {
      closeSound.play().catch((error) => console.error("Error playing sound:", error));
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-[2px] text-white flex items-center justify-center z-[1005] transition-all duration-300 ease-in-out"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="relative w-full max-w-3xl m-4 animate-in fade-in-0 zoom-in-95 duration-300">
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          aria-label="Close Login"
          className="absolute top-1 right-1 bg-white text-black z-10 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none hover:bg-gray-100 transition-all duration-200 hover:scale-110"
        >
          <X className="h-5 w-5" />
        </button>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginModal; 