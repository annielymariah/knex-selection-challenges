import { useEffect, useState } from "react";
import type { User } from "../../../api/types/userTypes";
import UserCard from "../../user/UserCard";
import { usePosts } from "../../../contexts";

const PostList = () => {
  const { posts, loading, error } = usePosts();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userHistory, setUserHistory] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);

  const defaultUser: User = {
    id: "default",
    name: {
      first: "Usuário",
      last: "desconhecido",
    },
    email: "sem-email@exemplo.com",
    login: {
      username: "usuario_default",
      id: 0,
      uuid: "0",
      sha256: "0",
      password: "0",
    },
    location: {
      country: "desconhecido",
      state: "desconhecido",
      city: "desconhecido",
    },
    dob: {
      age: 0,
      date: undefined,
    },
    picture: {
      large: "",
    },
    phone: "",
  };

  useEffect(() => {
    const fetchUserData = () => {
      try {
        // Busca usuário atual e histórico do localStorage
        const userData = localStorage.getItem("userData");
        const historyData = localStorage.getItem("userHistory");

        if (userData) {
          setCurrentUser(JSON.parse(userData));
        }

        if (historyData) {
          setUserHistory(JSON.parse(historyData));
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        setUsersLoading(false);
      }
    };

    // Carrega dados iniciais
    fetchUserData();

    // Configura listener para atualizações
    const handleUserUpdate = () => {
      fetchUserData();
    };

    window.addEventListener('userUpdated', handleUserUpdate);

    // Limpa listener ao desmontar
    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  // Função para encontrar usuário no histórico
  const findUserInHistory = (userId: number) => {
    return userHistory.find(user => user.login.id === userId);
  };

  if (loading || usersLoading) return (
    <div className="text-center py-8">
      <div className="inline-block h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-2">Carregando publicações...</p>
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center py-8">
      {error}
      <button 
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-2 bg-red-100 rounded hover:bg-red-200"
      >
        Tentar novamente
      </button>
    </div>
  );

  if (!posts.length) return (
    <div className="text-center py-8 text-gray-500">
      Nenhuma publicação disponível ainda. Seja o primeiro a postar!
    </div>
  );

  return (
    <div className="mt-10">
      <ul className="space-y-6">
        {posts.map((post) => {
          // Define o usuário a ser exibido na seguinte ordem:
          // 1. Usuário atual (se for o autor)
          // 2. Usuário do histórico (se existir)
          // 3. Usuário padrão
          const displayUser = 
            currentUser?.login?.id === post.userId ? currentUser :
            findUserInHistory(post.userId) || defaultUser;

          return (
            <li key={post.id}>
              <div className="flex flex-col border p-1 px-5 border-accent rounded-lg mb-4 bg-bg">
                <UserCard user={displayUser} type={true} />
                <h3 className="font-bold capitalize text-[1.25rem] mb-4 mt-2">{post.title}</h3>
                <p className="text-[0.875rem] mb-6">{post.body}</p>
                
                {/* Mostra indicador se for um usuário do histórico */}
                {!currentUser || currentUser.login.id !== post.userId ? (
                  <p className="text-xs text-gray-400 pb-4">
                    Publicação de um usuário anterior
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostList;