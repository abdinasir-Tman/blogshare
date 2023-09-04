import { Like } from "@/models/models";
import { ConnectToDb } from "@/util/database";

// Read Liked Posts
export const GET = async (req, { params }) => {
  try {
    await ConnectToDb();
    const likes = await Like.find({ frompost: params.id }).populate("frompost");
    return new Response(JSON.stringify(likes), { status: 200 });
  } catch (e) {
    return new Response("Filed to Read", { status: 500 });
  }
};
