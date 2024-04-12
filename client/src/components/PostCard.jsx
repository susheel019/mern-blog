import React from "react";
import { Link } from "react-router-dom";
function PostCard({ post }) {
  return (
    <div className="group relative w-full border-teal-500 border hover:border-2 h-[300px] overflow-hidden rounded-lg sm:w-[375px] transition-all ">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[200px] w-full object-cover group-hover:h-[150px] transition-all duration-200 z-20"
        />
      </Link>
      <div className="pl-2 pb-5  flex-col gap-2 mb-5 line-clamp-2 border-teal-500 ">
        <p className="text-lg font-semibold">{post.title}</p>
        <span className="italic text-sm ">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-100px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2 block"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
