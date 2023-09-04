import { model, models } from "mongoose";
import PostSchema from "./post";
import LikeSchema from "./like";
import CommentSchema from "./comment";

const UserPost = models.UserPost || model("UserPost", PostSchema);
const Like = models.Like || model("Like", LikeSchema);
const Comment = models.Comment || model("Comment", CommentSchema);

export { UserPost, Like, Comment };
