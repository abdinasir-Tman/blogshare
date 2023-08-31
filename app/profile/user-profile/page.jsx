"use client";
import Profile from "@/components/Profile";
import { usersPostFunction } from "@/features/postSlice";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { usersPost } = useSelector((store) => store.postState);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchProfile = async (id) => {
    try {
      const response = await fetch(`/api/posts/update/${id}`);
      const { message } = await response.json();
      dispatch(usersPostFunction(message));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProfile(id);
  }, [id]);
  return (
    <div className="p-3 max-w-3xl mx-auto m-3 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {usersPost.map((post) => (
        <>
          <Profile key={post._id} post={post} />
        </>
      ))}
    </div>
  );
};

export default ProfilePage;
