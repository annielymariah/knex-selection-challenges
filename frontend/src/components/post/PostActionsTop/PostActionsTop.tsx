import DeletePostButton from "../DeletePostButton";
import EditPostButton from "../EditPostButton";

interface PostActionsProps {
  postId: number;
  onEditClick: () => void;
}

const PostActionsTop = ({ postId, onEditClick }: PostActionsProps) => {
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

export default PostActionsTop;