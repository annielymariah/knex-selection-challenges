import { usePosts } from "../../../contexts";
import { FaTrashAlt } from 'react-icons/fa';

interface DeleteButtonProps {
    postId: number;
}

const DeletePostButton = ({ postId }: DeleteButtonProps) => {
    const { deletePost } = usePosts();

    const handleDelete = async () => {{
            try {
                await deletePost(postId);
            } catch (error) {
                console.error("Erro ao excluir publicação:", error);
                alert("Não foi possível excluir a publicação.");
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="text-accent px-4 py-4 rounded-lg mt-4 hover:text-primary transition-colors flex justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Excluir publicação"
        >
            <FaTrashAlt size={16}/>
        </button>
    );
};

export default DeletePostButton;