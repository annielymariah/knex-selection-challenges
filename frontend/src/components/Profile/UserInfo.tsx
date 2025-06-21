import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import type { User } from "../../types/userTypes";

export function UserInfo({ user }: { user: User }) {
  return (
    <div className="mt-14 flex flex-col gap-2 font-family-noto">
      
      <div className="flex flex-row gap-1">
      <h2 className="text-[1.25rem] font-bold">
        {user.name.first} {user.name.last}
      </h2>
      <p className="text-[0.875rem] font-medium text-accent">
        {user.dob.age} anos
      </p>
</div>
      <div className="flex flex-col items-center mb-2 text-[0.875rem] text-primary">
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
    </div>
  );
}