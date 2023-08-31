"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
const Profile = ({ post }) => {
  const router = useRouter();
  const deletePost = async (id) => {
    if (confirm(`Are you sure you want to delete`)) {
      try {
        const response = await fetch(`/api/posts/update/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          router.push(`/`);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="p-2 border rounded-md w-full h-24">
      <div>
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <p>{post.content}</p>
      </div>
      <div className="flex justify-end items-center gap-3">
        <span className="cursor-pointer text-green-400"> edit</span>
        <span
          onClick={() => deletePost(post._id)}
          className="cursor-pointer text-red-400"
        >
          {" "}
          delete
        </span>
      </div>
    </div>
  );
};

export default Profile;
