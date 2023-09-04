// import Like from "@/models/models";
import { Like } from "@/models/models";
import { UserPost } from "@/models/models";
import { ConnectToDb } from "@/util/database";
import mongoose from "mongoose";
// Register Liked Post
export const POST = async (req) => {
  const { frompost, userposted, like } = await req.json();

  try {
    await ConnectToDb();
    const likedOld = await Like.findOne({
      frompost,
      userposted,
    });

    if (likedOld) {
      await Like.findOneAndDelete({
        frompost,
        userposted,
      });

      await UserPost.findByIdAndUpdate(
        new mongoose.Types.ObjectId(frompost),
        { $pull: { likes: new mongoose.Types.ObjectId(likedOld._id) } },
        { new: true } // This option returns the updated document
      );

      let posts = await UserPost.findOne({
        _id: new mongoose.Types.ObjectId(frompost),
      });

      // posts = posts.likes.filter((likes) => likes != likedOld._id);

      // console.log("object", posts);

      // await posts.save();

      return new Response(
        JSON.stringify({ message: "Unlike", status: 200, data: likedOld })
      );
    } else {
      const newLike = new Like({
        like,
        userposted,
        frompost,
      });

      const liked = await newLike.save();
      const posts = await UserPost.findOne({
        _id: new mongoose.Types.ObjectId(frompost),
      });

      posts.likes.push(liked._id);

      await posts.save();
      return new Response(JSON.stringify({ message: "like", status: 200 }));
    }
  } catch (e) {
    console.log("like error ", e);
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
