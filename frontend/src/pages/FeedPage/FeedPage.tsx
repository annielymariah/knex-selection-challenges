import Layout from "../../components/layout/LayoutComponents";
import Main from "../../components/layout/MainContent";
import Sidebar from "../../components/layout/Sidebar";

export default function FeedPage() {
  return (
    <div>
      <Layout>
        <Sidebar/>
        <Main/>
      </Layout>
    </div>
  );
}
