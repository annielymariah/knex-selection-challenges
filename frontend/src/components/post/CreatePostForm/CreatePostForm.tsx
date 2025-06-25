import React, { useState, useRef } from "react";
import { postService } from "../../../api/services/postService";
import type { User } from "../../../api/types/userTypes";
import { usePosts } from "../../../contexts"; 

export default function CreatePostForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { addPost } = usePosts();

  async function submitPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const userData = localStorage.getItem("userData");
    if (!userData) {
      setError("Usuário não autenticado");
      setIsSubmitting(false);
      return;
    }

    const userLogged: User = JSON.parse(userData);
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const body = formData.get("content") as string;

    if (!userLogged?.login?.id) {
      setError("Dados do usuário incompletos");
      setIsSubmitting(false);
      return;
    }

    console.log("Dados do Formulário:", {
      título: title,
      conteúdo: body,
      userId: userLogged.login.id
    }); // Log dos dados do formulário, remover depois de testes :)

    try {
      const postData = {
        title,
        body,
        userId: userLogged.login.id 
      };

      console.log("Dados sendo enviados para a API:", postData); // Log dos dados que serão enviados, remover depois de testes >:C

      const response = await postService.createPost(postData);
      console.log("Resposta da API:", response); // Log da resposta da API, remover depois de testes =O
    
      addPost(response);
      
      setSuccess(true);
      formRef.current?.reset();
      
      // Feedback visual temporário
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Erro na criação do post:", error);
      setError("Erro ao criar post. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form ref={formRef} className="flex flex-col gap-4" onSubmit={submitPost}>
      <div className="space-y-2">
        <input
          name="title"
          type="text"
          placeholder="Insira o título"
          className="w-full p-4 rounded-lg border border-primary bg-bg focus:outline-none focus:border-2  text-text placeholder:text-text-secondary/60"
          required
          maxLength={100}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <textarea
          name="content"
          placeholder="Conte sua história..."
          className="w-full p-4 rounded-lg border border-primary bg-bg h-48 resize-none focus:outline-none focus:border-2 text-text placeholder:text-text-secondary/60"
          required
          maxLength={1000}
          disabled={isSubmitting}
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm p-2">
          {error}
        </div>
      )}

      {success && (
        <div className="text-green-600 text-sm p-2">
          Post criado com sucesso
        </div>
      )}

      <button
        type="submit"
        className="bg-primary text-white px-4 py-4 rounded-lg hover:bg-primary-dark transition-colors w-full flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="animate-pulse flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Publicando...
          </span>
        ) : (
          "Publicar sua história"
        )}
      </button>
    </form>
  );
}