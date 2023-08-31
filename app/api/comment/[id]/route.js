import Comment from "@/models/comment";
import { ConnectToDb } from "@/util/database";

export const GET = async (req, { params }) => {
  try {
    await ConnectToDb();
    const comments = await Comment.find({
      frompost: params.id,
    }).populate("user");
    return new Response(JSON.stringify({ comments, status: 200 }));
  } catch (e) {
    return new Response("Filed to Read Comments", { status: 500 });
  }
};
