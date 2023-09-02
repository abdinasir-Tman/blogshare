"use client";
import { isModalOpen, updatePosts, updateState } from "@/features/postSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { LuSend } from "react-icons/lu";

import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
const PostModal = () => {
  const { comment, currentPost, isModal } = useSelector(
    (store) => store.postState
  );
  const { data: session } = useSession();

  const dispatch = useDispatch();
  function closeModal() {
    dispatch(isModalOpen({ modal: false, data: null }));
  }
  //Reading comment

  const fetchComment = async (id) => {
    try {
      const response = await fetch(`/api/comment/${id}`);
      const { comments } = await response.json();

      dispatch(updatePosts({ postId: id, name: "comments", data: comments }));
    } catch (e) {
      console.log(e);
    }
  };
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/comment/`, {
        method: "POST",
        body: JSON.stringify({
          frompost: currentPost._id,
          user: session?.user.id,
          comment,
        }),
      });
      // fetchComment()
      const data = await response.json();
      fetchComment(currentPost._id);

      dispatch(updateState({ name: "comment", value: "" }));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Modal
        isOpen={isModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
        className="shadow-lg fixed bg-white p-4 rounded-md top-10 left-40 right-40 bottom-20"
      >
        {/* <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="text-2xl text-center"
        >
          Customer Regestration
        </h2> */}
        <div>
          <button
            onClick={closeModal}
            className="absolute top-1 right-4 text-3xl font-bold "
          >
            &times;
          </button>
        </div>
        <div className="h-full pb-16 overflow-y-auto">
          {currentPost?.comments.length > 0 ? (
            currentPost?.comments.map((com) => (
              <div className="flex  flex-col gap-3">
                <div className="flex gap-2">
                  <div>
                    <Image
                      src={com.user.image}
                      width={33}
                      height={33}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <span>{com.user.username}</span>
                    <p className="p-3 w-full h-auto bg-gray-300 text-gray-600 rounded-md">
                      {com.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="flex justify-center items-center h-full">
              There is no comment
            </h1>
          )}
        </div>

        <form
          onSubmit={handleComment}
          className="absolute bottom-0 right-0 left-0"
        >
          <div className="flex relative">
            <textarea
              value={comment}
              autoComplete="of"
              type="text"
              className="p-3 border w-full rounded-md flex flex-grow"
              onChange={(e) =>
                dispatch(
                  updateState({ name: "comment", value: e.target.value })
                )
              }
              required
            />
            <button
              className="btn absolute top-1/4 bottom-1/4 right-4 text-gray-900 float-right text-4xl"
              type="submit"
            >
              <LuSend />
            </button>
          </div>
        </form>
      </Modal>
      {/* <Toaster /> */}
    </div>
  );
};

export default PostModal;
