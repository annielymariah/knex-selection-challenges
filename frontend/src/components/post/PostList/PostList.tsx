import { useEffect, useState } from "react";
import { UserService } from "../../../api/services/userService";
import type { User } from "../../../api/types/userTypes";
import UserCard from "../../user/UserCard";
import { usePosts } from "../../../contexts"; 

const PostList = () => {
  const { posts, loading, error } = usePosts(); 
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (posts.length > 0) {
          const uniqueUserIds = [...new Set(posts.map(post => post.userId))];
          const userList = await UserService.getMultipleUsers(uniqueUserIds.length);
          setUsers(userList);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, [posts]);

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
          const user = users.find(u => u.login.id === post.userId);
          return (
            <li key={post.id}>
              <div className="flex flex-col border p-1 px-5 border-accent rounded-lg mb-4 bg-bg">
                {user && <UserCard user={user} type={true} />}
                <h3 className="font-bold capitalize text-[1.25rem] mb-4 mt-2">{post.title}</h3>
                <p className="text-[0.875rem] mb-6">{post.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostList;