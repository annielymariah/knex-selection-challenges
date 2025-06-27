import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";

export const PostActionsBellow: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(false);

  return (
    <div className="relative flex row justify-between items-center bg-bg-secondary px-4 py-2 mb-2 w-full">
      <span className="flex row gap-x-2">
        <button
          type="button"
          onClick={() => setLiked((prev) => !prev)}
          className="focus:outline-none"
        >
          {liked ? <AiFillLike size={32} /> : <AiOutlineLike size={30} />}
        </button>

        <button
          type="button"
          onClick={() => setStarred((prev) => !prev)}
          className="focus:outline-none"
        >
          {starred ? <AiFillStar size={32} /> : <AiOutlineStar size={30} />}
        </button>
      </span>

      <span>
        <AiOutlineShareAlt size={32} />
      </span>
    </div>
  );
};

export default PostActionsBellow;