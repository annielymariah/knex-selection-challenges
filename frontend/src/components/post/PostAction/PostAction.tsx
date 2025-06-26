import DeletePostButton from "../DeletePostButton/DeletePostButton";
import EditPostButton from "../EditPostButton/EditPostButton";

interface PostActionsProps {
  postId: number;
  onEditClick: () => void;
}

const PostActions = ({ postId, onEditClick }: PostActionsProps) => {
  return (
    <div className="flex">
      <EditPostButton
        postId={postId}
        onEditClick={onEditClick}
      />
      <DeletePostButton postId={postId} />
    </div>
  );
};

export default PostActions;