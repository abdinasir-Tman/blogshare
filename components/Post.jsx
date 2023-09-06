"use client";
import { FaRegCommentDots } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { AiTwotoneLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { isModalOpen, updatePosts } from "@/features/postSlice";
import Image from "next/image";

const Post = ({ post, fetchPosts }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);
  // const fetchComment = async (id) => {
  //   try {
  //     const response = await fetch(`/api/comment/${id}`);
  //     const { comments } = await response.json();

  //     dispatch(updatePosts({ postId: id, name: "comments", data: comments }));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // const fetchLike = async (id) => {
  //   try {
  //     const response = await fetch(`/api/like/${id}`);
  //     const data = await response.json();

  //     dispatch(updatePosts({ postId: id, name: "likes", data }));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   fetchLike(post._id);
  //   fetchComment(post._id);
  // }, []);

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
      // fetchLike(post._id);
      fetchPosts();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="p-2 border rounded-md w-full h-auto">
      <div className="flex gap-3 justify-center items-center">
        <Image
          src={post.author.image}
          width={33}
          height={33}
          className="rounded-full"
        />
        <span className="text-xl text-gray-500">{post.author.username}</span>
      </div>
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
            {console.log(
              "is this ",
              post.likes?.filter((like) => like.userposted === session.user.id)
                .length > 0
            )}
            <AiTwotoneLike
              className={`text-2xl ${
                session?.user.id &&
                post.likes?.filter(
                  (like) => like.userposted === session.user.id
                ).length > 0 &&
                post.likes.length > 0
                  ? "text-gray-900"
                  : "text-gray-400"
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
