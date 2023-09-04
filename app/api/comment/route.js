import { Comment } from "@/models/models";
import { UserPost } from "@/models/models";
import { ConnectToDb } from "@/util/database";

export const POST = async (req) => {
  const { frompost, user, comment } = await req.json();

  try {
    await ConnectToDb();
    const newComment = new Comment({
      frompost,
      user,
      comment,
    });
    await newComment.save();
    const posts = await UserPost.findById(frompost);

    posts.comments.push(newComment._id);
    posts.save();

    return new Response(JSON.stringify(newComment));
  } catch (e) {
    return new Response("Filed To Register ", e);
  }
};
