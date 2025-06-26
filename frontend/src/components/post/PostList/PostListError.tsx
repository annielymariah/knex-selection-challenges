interface PostListErrorProps {
  error: string;
}

const PostListError = ({ error }: PostListErrorProps) => {
  return (
    <div className="text-red-500 text-center py-8">
      {error}
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-2"
      >
        Tentar novamente
      </button>
    </div>
  );
};

export default PostListError;