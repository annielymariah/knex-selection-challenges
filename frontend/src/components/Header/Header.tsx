import { FaBell } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import MenuHamburger from "./MenuHamburger";

export default function Header() {
  return (
    <header className="w-full bg-bg-secondary p-4 border-b border-primary/30">
      <div className="flex items-center w-full">
        <div className="flex-1">

          {/* Logo e Link pra "Homepage"*/}

          <Link to="/" className="text-4xl font-family-playball">
            Story<span className="text-accent">Telling</span>
          </Link>
        </div>

        {/* Menu de navegação */}
        <nav className="hidden sm:flex items-center gap-4 flex-none">
          <button
            aria-label="Chat"
            className=" text-secondary hover:text-accent transition-colors"
          >
            <BsChat size={24} />
          </button>

          <button
            aria-label="Notificações"
            className=" text-secondary hover:text-accent transition-colors relative"
          >
            <FaBell size={24} />
          </button>
          <Search />
        </nav>

        {/* Menu de mobile */}
        <div className="sm:hidden flex items-center gap-4 flex-none">
          <MenuHamburger />
        </div>
      </div>
    </header>
  );
}
