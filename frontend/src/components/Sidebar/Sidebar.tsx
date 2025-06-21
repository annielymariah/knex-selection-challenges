import Profile from "../Profile";
import TopUsers from "../TopUsers/TopUsers";

export default function Sidebar() {
  return (
    <aside className="w-100">
      <Profile />
      <TopUsers />
    </aside>
  );
}
