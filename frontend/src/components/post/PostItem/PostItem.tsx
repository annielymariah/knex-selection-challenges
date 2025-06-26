import type { Post } from "../../../api/types/postTypes";
import type { User } from "../../../api/types/userTypes";
import UserCard from "../../user/UserCard";
import PostActions from "../PostAction/PostAction";

interface PostItemProps {
  post: Post;
  displayUser: User;
  isCurrentUserAuthor: boolean;
  onEditClick: () => void;
}

const PostItem = ({ post, displayUser, isCurrentUserAuthor, onEditClick }: PostItemProps) => {
  return (
    <li key={post.id}>
      <div className="flex flex-col border p-1 px-5 border-accent rounded-lg mb-4 bg-bg">
        <div className="flex justify-between items-start">
          <UserCard user={displayUser} type={true} />
          
          {isCurrentUserAuthor && (
            <PostActions 
              postId={post.id} 
              onEditClick={onEditClick} 
            />
          )}
        </div>

        <h3 className="font-bold capitalize text-[1.25rem] mb-4 mt-2">
          {post.title}
        </h3>
        <p className="text-[0.875rem] mb-6">{post.body}</p>

        {!isCurrentUserAuthor && (
          <p className="text-xs text-gray-400 pb-4">
            Publicação de um usuário anterior
          </p>
        )}
      </div>
    </li>
  );
};

export default PostItem;