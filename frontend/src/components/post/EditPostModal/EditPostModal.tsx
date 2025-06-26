import { useState, useEffect } from "react";
import type { Post } from "../../../api/types/postTypes";

interface EditPostModalProps {
  post: Post | undefined;
  onClose: () => void;
  onSave: (updatedPost: Post) => Promise<void>;
  loading?: boolean;
}

const EditPostModal = ({
  post,
  onClose,
  onSave,
  loading = false,
}: EditPostModalProps) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  if (!post) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ ...post, title, body });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-bg rounded-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Editar Publicação</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
              className="w-full border border-primary rounded px-3 py-2 focus:outline-none focus:border-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Conteúdo</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              disabled={loading}
              className="w-full border border-primary rounded px-3 py-2 focus:outline-none focus:border-2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="                            bg-bg text-button border border-accent px-4 py-4 rounded-lg mt-4 hover:border-primary hover:bg-bg transition-colors w-full flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-accent text-white px-4 py-4 rounded-lg mt-4 hover:bg-primary transition-colors w-full flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
