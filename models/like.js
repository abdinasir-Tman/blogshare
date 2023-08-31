import { Schema, model, models } from "mongoose";

const LikeSchema = new Schema({
  like: {
    type: String,
  },
  userposted: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  frompost: {
    type: Schema.Types.ObjectId,

    required: true,
    ref: "UserPost",
  },
});
const Like = models.Like || model("Like", LikeSchema);
export default Like;
