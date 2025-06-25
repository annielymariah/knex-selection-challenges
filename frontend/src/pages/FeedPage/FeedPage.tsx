import Layout from "../../components/layout/LayoutComponents";
import Main from "../../components/layout/MainContent";
import Sidebar from "../../components/layout/Sidebar";

export default function FeedPage() {
  return (
    <div>
      <Layout> {/* Componente de layout que inclui Header e Footer */}
        {/* Área principal do feed */}
        <Sidebar/> {/* Componente de sidebar com perfil e top usuários */}
        <Main/> {/* Componente principal que contém o formulário de criação de posts e a lista de posts */}
      </Layout> 
    </div>
  );
}
