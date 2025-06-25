import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
<div className="relative flex items-center"> {/* Container para o campo de pesquisa, lógica incompleta */}
            <input
              type="text"
              placeholder="Pesquisar..."
              aria-label="Campo de pesquisa"
              className="pl-4 pr-10 py-2 rounded-md border border-bg-secondary bg-bg
              text-accent focus:outline-none focus:ring-1 focus:ring-accent  
              transition-all w-48" 
            />
            <button 
              type="button"
              aria-label="Pesquisar"
              className="absolute right-3 text-secondary hover:text-accent"
            >
              <FaSearch size={20} />
            </button>
          </div>
  );
}

