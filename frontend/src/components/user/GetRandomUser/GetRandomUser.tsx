import { useEffect, useState } from "react";
import type { User } from "../../../api/types/userTypes";
import { UserService } from "../../../api/services/userService";
import UserCard from "../UserCard";

export default function GetRandomUserCard() {
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

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div>Nenhum usuário disponível</div>;

  return (
    <div className="flex flex-col justify-items-normal max-w-full bg-bg p-4 rounded-b-xl">
      <UserCard {...user} />
    </div>
  );
}
