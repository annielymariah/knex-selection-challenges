import type { User } from "../../../api/types/userTypes";

export default function UserCard(user: User) {
  return (
    <>
      {user && (
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
      )}
    </>
  );
}
