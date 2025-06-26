import { FaEdit } from 'react-icons/fa';

interface EditPostButtonProps {
    postId: number;
    onEditClick: () => void;
    className?: string;
    size?: number;
}

const EditPostButton = ({ 
    postId, 
    onEditClick, 
    size,
}: EditPostButtonProps) => {
    return (
        <button
            onClick={onEditClick}
            className="text-accent px-4 py-4 rounded-lg mt-4 hover:text-primary transition-colors flex justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            
            aria-label="Editar publicação"
            title="Editar publicação"
            data-postid={postId}
        >
            <FaEdit size={size} />
        </button>
    );
};

export default EditPostButton;