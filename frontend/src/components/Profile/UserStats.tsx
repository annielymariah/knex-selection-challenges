export function UserStats() {

  // Mock para emular números de seguidores e seguindo
  // substituir por uma chamada de API real (Caso eu reutilize esse projeto futuramente)
  
  const emulateFollowNumbers = () => Math.floor(Math.random() * 10000).toLocaleString();
  const postCount = Math.floor(Math.random() * 100);
  const postCountText = postCount === 1 ? "História" : "Histórias";

  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <div className="flex gap-4 mt-4">
        <div className="text-center">
          <p className="text-[1.125rem] font-family-noto font-bold">{postCount}</p>
          <p className="text-[0.875rem]">{postCountText}</p>
        </div>
        <div className="text-center">
          <p className="text-[1.125rem] font-family-noto font-bold">
            {emulateFollowNumbers()}
          </p>
          <p className="text-[0.875rem]">Seguidores</p>
        </div>
        <div className="text-center">
          <p className="text-[1.125rem] font-family-noto font-bold">
            {emulateFollowNumbers()}
          </p>
          <p className="text-[0.875rem]">Seguindo</p>
        </div>
      </div>
    </div>
  );
}