const PostListLoading = () => {
  return (
    <div className="text-center py-8">
      <div className="inline-block h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-2">Carregando publicações...</p>
    </div>
  );
};

export default PostListLoading;