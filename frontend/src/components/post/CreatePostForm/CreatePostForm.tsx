export default function CreatePostForm() {
  return (
    <form className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Insíra o título"
        className="w-full p-4 rounded-lg border border-primary bg-bg focus:outline-none focus:ring-1 focus:ring-primary text-text placeholder:text-text-secondary/60"
      />
      <textarea
        placeholder="Conte sua história..."
        className="w-full p-4 rounded-lg border border-primary bg-bg h-48 resize-none focus:outline-none focus:ring-1 focus:ring-primary text-text placeholder:text-text-secondary/60"
      />

      <button
        type="submit"
        className="bg-text text-text-accent px-4 py-4 rounded-lg mt-4 hover:bg-accent transition-colors w-full flex justify-center items-center"
      >
        Publicar sua história
      </button>
    </form>
  );
}
