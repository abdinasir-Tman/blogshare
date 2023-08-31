"use client";

import { useEffect, useState } from "react";
import Post from "./Post";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "@/features/postSlice";
import PostModal from "./PostModal";

const Posts = () => {
  const { posts } = useSelector((store) => store.postState);

  const { data: session } = useSession();
  const dispatch = useDispatch();

  // Fetchign posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts/new");
        const data = await response.json();

        dispatch(updateState({ name: "posts", value: data }));
      } catch (e) {
        console.log("error jira ", e);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-3 max-w-3xl mx-auto m-3 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {posts?.map((post) => (
        <div key={post._id}>
          {/* {setTimeout(() => fetchLike(post._id), 1000)} */}

          <Post post={post} />
        </div>
      ))}
      <PostModal />
    </div>
  );
};

export default Posts;
