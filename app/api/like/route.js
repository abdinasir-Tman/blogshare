import Like from "@/models/like";
import { ConnectToDb } from "@/util/database";
// Register Liked Post
export const POST = async (req) => {
  const { frompost, userposted, like } = await req.json();
  console.log(frompost, userposted, like);
  try {
    await ConnectToDb();
    const liked = await Like.find({
      frompost,
      userposted,
    });

    if (liked.length > 0) {
      await Like.findOneAndDelete({
        frompost,
        userposted,
      });
      return new Response(
        JSON.stringify({ message: "Unlike", status: 200, data: liked })
      );
    } else {
      const newLike = new Like({
        like,
        userposted,
        frompost,
      });

      await newLike.save();
      return new Response(JSON.stringify({ message: "like", status: 200 }));
    }
  } catch (e) {
    return new Response("Filed to Register Like", { status: 500 });
  }
};
//Read like comment
export const GET = async (req) => {
  try {
    await ConnectToDb();
    const likes = await Like.find({}).populate("frompost");
    return new Response(JSON.stringify(likes), { status: 200 });
  } catch (e) {
    return new Response("Filed to Read", { status: 500 });
  }
};
