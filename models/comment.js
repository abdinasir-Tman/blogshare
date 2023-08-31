import { Schema, models, model } from "mongoose";

const commentSchema = new Schema({
  frompost: {
    type: Schema.Types.ObjectId,
    ref: "UserPost",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
  },
});
const Comment = models.Comment || model("Comment", commentSchema);
export default Comment;
