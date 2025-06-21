import { useState, useEffect } from "react";
import { UserService } from "../../services/userService";
import { Link } from "react-router-dom";
import type { User } from "../../types/userTypes";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const randomUser = await UserService.getRandomUser();
        setUser(randomUser);
      } catch (err) {
        setError("Erro ao carregar usuário");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Mock de números de seguidores e seguindo

  const emulateFollowNumbers = () => {
    return Math.floor(Math.random() * 10000).toLocaleString();
  };

  // Contagem de postagens

  const postCount = Math.floor(Math.random() * 100);
  const postCountText = postCount === 1 ? "História" : "Histórias";

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div>Nenhum usuário disponível</div>;

  return (
    <div>
      <div className="flex flex-col items-center max-w-80 relative bg-bg">
        <img className="bg-black w-full h-32 rounded-t-lg" /> {/*Banner*/}
        {/*Foto de perfil*/}
        <img
          className="w-24 h-24 rounded-full bg-accent border-3 border-bg 
          object-cover absolute left-1/2 -translate-x-1/2 -bottom-12"
          style={{ top: "5rem" }}
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
        />
        <div className="mt-14 flex gap-2 font-family-noto">
          {/*Informações do usuário*/}
          <h2 className="text-[1.25rem] font-bold">
            {/*Nome do usuário*/}
            {user.name.first} {user.name.last}
          </h2>
          <p className="text-[0.875rem] font-medium text-accent">
            {/*Idade do usuário*/}
            {user.dob.age} anos
          </p>
        </div>
        <div className="flex flex-col items-center mb-2 text-[0.875rem] text-primary">
          {/* Informações adicionais do usuário */}
          <p>{user.email}</p>
          <p>@{user.login.username}</p>
          <div className="flex items-center gap-2 mt-4">
            <FaPhone className="flex-shrink-0" />
            <p>{user.phone}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="flex-shrink-0" />
            <p>
              {user.location.city}, {user.location.country}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 mb-4">
          {/* Postagem, seguidores e seguindo */}
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <p className="text-[1.125rem] font-family-noto font-bold">
                {postCount}
              </p>
              <p className="text-[0.875rem]">{postCountText}</p>
            </div>
            <div className="text-center">
              <p className="text-[1.125rem] font-family-noto font-bold">
                {" "}
                {emulateFollowNumbers()}
              </p>
              <p className="text-[0.875rem]">Seguidores</p>
            </div>
            <div className="text-center">
              <p className="text-[1.125rem] font-family-noto font-bold">
                {" "}
                {emulateFollowNumbers()}
              </p>
              <p className="text-[0.875rem]">Seguindo</p>
            </div>
          </div>
        </div>
        {/* Botão de visualizar perfil */}
        <Link
          to="#"
          className="bg-accent text-bg px-4 py-3 rounded-lg mt-4 hover:bg-primary transition-colors w-11/12 flex justify-center items-center"
        >
          Visualizar Perfil
        </Link>
      </div>
    </div>
  );
}
