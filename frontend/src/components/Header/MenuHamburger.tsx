import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuHamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass =
    "text-secondary hover:text-accent transition-colors text-lg font-semibold py-2 px-4 rounded w-full text-left  font-family-noto";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center gap-4 flex-none px-2"
      >
        {isOpen ? (
          <FiX
            size={30}
            className="text-secondary hover:text-accent transition-colors"
          />
        ) : (
          <FiMenu
            size={30}
            className=" text-secondary hover:text-accent transition-colors"
          />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-[21px] bg-bg-secondary border border-secondary flex flex-col items-start p-4 z-50">
                    <Link
            to="#"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Chat
          </Link>
          <Link
            to="#"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Notificações
          </Link>

        </div>
      )}
    </div>
  );
}
