import { useState, useEffect } from "react";
import usePersistedUser from "../../../api/hooks/usePersistedUser";
import { ProfileHeader } from "./ProfileHeader";
import { UserInfo } from "./UserInfo";
import { UserStats } from "./UserStats";
import { ProfileLink } from "./ProfileLink";

export default function Profile() {
  const { 
    loggedUser, 
    loading, 
    login, 
    /*logout*/ 
  } = usePersistedUser();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Faz login automático se não houver usuário logado e não estiver carregando
    if (!loading && !loggedUser) {
      const autoLogin = async () => {
        try {
          await login();
        } catch (err) {
          setError("Erro ao carregar perfil");
          console.error(err);
        }
      };
      autoLogin();
    }
  }, [loading, loggedUser, login]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!loggedUser) return <div>Carregando perfil...</div>;

  return (
    <div className="flex flex-col items-center max-w-full relative bg-bg pb-6 rounded-t-xl">
      <ProfileHeader user={loggedUser} />
      <UserInfo user={loggedUser} />
      <UserStats />
      <ProfileLink />
      
      {/* Apenas para fins de teste 
      <button 
        onClick={logout}
      >
        Logout
      </button>
      */}
    </div>
  );
}