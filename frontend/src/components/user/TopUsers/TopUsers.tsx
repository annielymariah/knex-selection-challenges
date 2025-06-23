import { useState, useEffect } from "react";
import { UserService } from "../../../api/services/userService";
import type { User } from "../../../api/types/userTypes";
import { Link } from "react-router-dom";
import UserCard from "../UserCard";

export default function TopUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await UserService.getMultipleUsers(5);
        setUsers(userList);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Carregando top usuários...</div>;

  return (
    <div className="flex flex-col justify-items-normal max-w-full bg-bg p-4 rounded-b-xl">
      <div className="flex justify-between items-center mb-4 bg-bg-secondary pb-1">
        <span className=" font-bold font-family-noto">Top</span>
        <span className="font-family-noto ml-1">Storytellers</span>
        {/* Atualizar posteriormente com a rota para a página de visualizar todos os usuários */}
        <Link
          to="#"
          aria-label="Ver todos os usuários"
          className="ml-auto underline text-primary font-family-noto hover:text-accent transition-colors"
        >
          Ver todos
        </Link>
      </div>

      <div className="flex flex-col justify-items-normal max-w-full bg-bg p-4 rounded-b-xl">
        {users.map((user) => (
          <UserCard {...user} />
        ))}
      </div>
    </div>
  );
}
