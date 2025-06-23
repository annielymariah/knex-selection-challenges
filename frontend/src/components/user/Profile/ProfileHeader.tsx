import type { User } from "../../../types/userTypes";

export function ProfileHeader({ user }: { user: User }) {
  return (
    <div className="w-full">
      <img 
        className="bg-black max-w-full h-32 rounded-t-lg" 
        alt="Banner do perfil" 
      />
      <img
        className="w-24 h-24 rounded-full bg-accent border-3 border-bg 
        object-cover absolute left-1/2 -translate-x-1/2 -bottom-12"
        style={{ top: "5rem" }}
        src={user.picture.large}
        alt={`${user.name.first} ${user.name.last}`}
      />
    </div>
  );
}