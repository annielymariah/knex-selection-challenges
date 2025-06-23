import Profile from "../../user/Profile";
import TopUsers from "../../user/TopUsers";

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-80">
      <Profile />
      <TopUsers />
    </aside>
  );
}
