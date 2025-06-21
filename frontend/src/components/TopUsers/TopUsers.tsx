import { useState, useEffect } from "react";
import { UserService } from "../../services/userService";
import type { User } from "../../types/userTypes";
import { Link } from "react-router-dom";

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
        <Link to="/top-users"
        aria-label="Ver todos os usuários"
          className="ml-auto underline text-primary font-family-noto hover:text-accent transition-colors"
        > </Link>
        Ver todos
      </div>

      {users.map((user) => (
        <div key={user.login.username}>
          <div className="my-1.5 flex flex-row items-center gap-4">
            <img
              className="w-16 h-16 rounded-full bg-accent border-3 border-bg object-cover"
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
            />
            <div className="flex flex-col items-start">
              <h3 className="font-semibold font-family-noto">
                {user.name.first} {user.name.last}
              </h3>
              <p className="text-[0.875rem] text-primary">
                @{user.login.username}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}