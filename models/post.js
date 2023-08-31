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
});
const UserPost = models.UserPost || model("UserPost", PostSchema);
export default UserPost;
