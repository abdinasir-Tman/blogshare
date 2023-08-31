"use client";
import { FaRegCommentDots } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { AiTwotoneLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { isModalOpen, updatePosts } from "@/features/postSlice";

const Post = ({ post }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const fetchComment = async (id) => {
    try {
      const response = await fetch(`/api/comment/${id}`);
      const { comments } = await response.json();

      dispatch(updatePosts({ postId: id, name: "comments", data: comments }));
    } catch (e) {
      console.log(e);
    }
  };
  const fetchLike = async (id) => {
    try {
      const response = await fetch(`/api/like/${id}`);
      const data = await response.json();

      dispatch(updatePosts({ postId: id, name: "likes", data }));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchLike(post._id);
    fetchComment(post._id);
  }, [post]);

  //Like the post
  const handleLike = async (frompost) => {
    try {
      const response = await fetch(`/api/like/`, {
        method: "POST",
        body: JSON.stringify({
          frompost,
          userposted: session?.user.id,
          like: "liked",
        }),
      });
      const data = await response.json();
      fetchLike(post._id);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="p-2 border rounded-md w-full h-24">
      <div>
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <p>{post.content}</p>
      </div>
      <div className="pb-3 flex justify-between items-center">
        <span
          onClick={() => {
            handleLike(post._id);
          }}
          className="flex cursor-pointer text-base items-center justify-center"
        >
          <>
            <AiTwotoneLike
              className={`text-2xl ${
                post.likes?.length > 0 ? "text-gray-900" : "text-gray-400"
              } transition-colors duration-200`}
            />
            {post.likes?.length}
          </>
        </span>

        <span
          onClick={() => {
            dispatch(isModalOpen({ modal: true, data: post }));
          }}
          className="flex items-center text-black justify-center"
        >
          <FaRegCommentDots className="text-2xl mr-2 text-black cursor-pointer" />
          {post.comments?.length}
        </span>
      </div>
    </div>
  );
};

export default Post;
