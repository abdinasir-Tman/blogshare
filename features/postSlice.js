import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  posts: [],
  comment: "",
  isModal: false,
  currentPost: null,
  usersPost: [],
};
const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    updatePosts: (state, action) => {
      let postIndex = state.posts.findIndex(
        (post) => post._id == action.payload.postId
      );

      state.posts[postIndex] = {
        ...state.posts[postIndex],
        [action.payload.name]: action.payload.data,
      };
    },
    isModalOpen: (state, action) => {
      state.isModal = action.payload.modal;
      state.currentPost = action.payload.data;
    },
    usersPostFunction: (state, action) => {
      state.usersPost = action.payload;
    },
  },
});

export default postSlice.reducer;
export const { usersPostFunction, isModalOpen, updateState, updatePosts } =
  postSlice.actions;
