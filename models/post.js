import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: "string",
    required: true,
  },
  content: {
    type: "string",
  },
  author: {
    type: Schema.ObjectId,

    ref: "User",
  },
  likes: [
    {
      type: Schema.ObjectId,

      ref: "Like",
    },
  ],
  comments: [
    {
      type: Schema.ObjectId,

      ref: "Comment",
    },
  ],
});
// const UserPost = models.UserPost || model("UserPost", PostSchema);
export default PostSchema;
