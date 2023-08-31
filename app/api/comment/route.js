import Comment from "@/models/comment";
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
    return new Response(JSON.stringify(newComment));
  } catch (e) {
    return new Response("Filed To Register ", e);
  }
};
