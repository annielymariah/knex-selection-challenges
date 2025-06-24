import { useState, useEffect } from "react";
import { UserService } from "../../../api/services/userService";
import type { User } from "../../../api/types/userTypes";
import { ProfileHeader } from "./ProfileHeader";
import { UserInfo } from "./UserInfo";
import { UserStats } from "./UserStats";
import { ProfileLink } from "./ProfileLink";

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

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div>Nenhum usuário disponível</div>;

  return (
    <div className="flex flex-col items-center max-w-full relative bg-bg pb-6 rounded-t-xl">
      <ProfileHeader user={user} />
      <UserInfo user={user} />
      <UserStats />
      <ProfileLink />
    </div>
  );
}