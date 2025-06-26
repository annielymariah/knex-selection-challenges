import type { User } from "../../../api/types/userTypes";
import { FaMapMarkerAlt } from "react-icons/fa";

type UserCardProps = {
  user: User;
  type?: boolean;
};

export default function UserCard({ user, type }: UserCardProps) {
  let widthImg: string, heightImg: string, titleSize: string, fontSize: string;

  if (!type) { // Tipo para TopUsers
    widthImg = "w-16";
    heightImg = "h-16";
    titleSize = "text-[1rem]";
    fontSize = "text-[0.875rem]";
  } else { // Tipo para PostList
    widthImg = "w-20";
    heightImg = "h-20";
    titleSize = "text-[1.25rem]";
    fontSize = "text-[1rem]";
  }

  return (
    <div key={user.login.username}>
      <div className="my-1.5 flex flex-row items-center gap-4">
        <img
          className={`${widthImg} ${heightImg} rounded-full bg-accent border-3 border-bg object-cover`}
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
        />
        <div className="flex flex-col items-start">
          <h3 className={`${titleSize} font-semibold font-family-noto`}>
            {user.name.first} {user.name.last}
          </h3>
          <p className={`${fontSize} text-primary`}>
            @{user.login.username}
          </p>
          <p className={!type ? "hidden" : "text-primary flex row gap-1"}>
            <FaMapMarkerAlt/>{user.location.city}, {user.location.state}
          </p>
        </div>
      </div>
    </div>
  );
}
