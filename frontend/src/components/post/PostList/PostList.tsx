import { useEffect, useState } from "react";
import type { User } from "../../../api/types/userTypes";
import type { Post } from "../../../api/types/postTypes";
import { usePosts } from "../../../contexts";
import PostItem from "../PostItem/PostItem";
import EditPostModal from "../EditPostModal/EditPostModal";
import PostListLoading from "./PostListLoading";
import PostListError from "./PostListError";
import PostListEmpty from "./PostListEmpty";

const PostList = () => {
  const { posts, loading, error, updatePost } = usePosts();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userHistory, setUserHistory] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const defaultUser: User = {
    id: "default",
    name: { first: "Usuário", last: "desconhecido" },
    email: "sem-email@exemplo.com",
    login: {
      username: "usuario_default",
      id: 0,
      uuid: "0",
      sha256: "0",
      password: "0",
    },
    location: {
      country: "desconhecido",
      state: "desconhecido",
      city: "desconhecido",
    },
    dob: { age: 0, date: undefined },
    picture: { large: "none" },
    phone: "0",
  };

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const userData = localStorage.getItem("userData");
        const historyData = localStorage.getItem("userHistory");

        if (userData) setCurrentUser(JSON.parse(userData));
        if (historyData) setUserHistory(JSON.parse(historyData));
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUserData();
    window.addEventListener("userUpdated", fetchUserData);
    return () => window.removeEventListener("userUpdated", fetchUserData);
  }, []);

  const findUserInHistory = (userId: number) => {
    return userHistory.find((user) => user.login.id === userId);
  };

  const handleSavePost = async (updatedPost: Post) => {
    setIsUpdating(true);
    try {
      await updatePost(updatedPost);
      setEditingPostId(null);
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading || usersLoading) return <PostListLoading />;
  if (error) return <PostListError error={error} />;
  if (!posts.length) return <PostListEmpty />;

  return (
    <div className="mt-10">
      <ul className="space-y-6">
        {posts.map((post) => {
          const displayUser =
            currentUser?.login?.id === post.userId
              ? currentUser
              : findUserInHistory(post.userId) || defaultUser;

          return (
            <PostItem
              key={post.id}
              post={post}
              displayUser={displayUser}
              isCurrentUserAuthor={currentUser?.login?.id === post.userId}
              onEditClick={() => setEditingPostId(post.id)}
            />
          );
        })}
      </ul>

      {editingPostId !== null && (
        <EditPostModal
          post={posts.find((p) => p.id === editingPostId)}
          onClose={() => setEditingPostId(null)}
          onSave={handleSavePost}
          loading={isUpdating}
        />
      )}
    </div>
  );
};

export default PostList;