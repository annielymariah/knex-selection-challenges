import CreatePostForm from "../../post/CreatePostForm/CreatePostForm";
import PostList from "../../post/PostList";
import { PostProvider } from "../../../contexts";

export default function Main() {
  return (
    <main className="flex-1 p-4 bg-bg text-text-secondary rounded-lg">
      <div className="space-y-4 mt-8">
        
        <PostProvider> {/* Contexto para gerenciar posts */}
        <CreatePostForm/> {/* Formulário para criar novos posts */}
        <PostList /> {/* Lista de posts */}
        </PostProvider> 
      </div>
    </main>
  );
}
