import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "email Already exists"],
  },
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);
export default User;
