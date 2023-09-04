"use client";
import Form from "@/components/Form";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const page = () => {
  const { data: session } = useSession();
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const router = useRouter();
  const creatPost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/posts/new", {
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          author: session.user.id,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      router.push("/");
    }
  };

  useEffect(() => {
    if (!session?.user) return router.push("/");
  }, []);
  return (
    <section className="max-w-3xl mx-auto my-2">
      <Form
        name="Create New Post"
        handleSubmit={creatPost}
        content={""}
        title={""}
        setPost={setPost}
        post={post}
      />
    </section>
  );
};

export default page;
