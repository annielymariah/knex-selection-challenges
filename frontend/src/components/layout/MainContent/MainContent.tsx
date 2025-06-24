import CreatePostForm from "../../post/CreatePostForm";
import PostList from "../../post/PostList";


export default function Main() {
  return (
    <main className="flex-1 p-4 bg-bg text-text-secondary rounded-lg">
      <div className="space-y-4 mt-8">
        <CreatePostForm/>
        <PostList />
      </div>
    </main>
  );
}
