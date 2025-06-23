import { Link } from "react-router-dom";

export function ProfileLink() {
  return (
    <Link
      to="#"
      className="bg-accent text-text-accent px-4 py-3 rounded-lg mt-4 hover:bg-primary transition-colors w-11/12 flex justify-center items-center"
    >
      Visualizar Perfil
    </Link>
  );
}