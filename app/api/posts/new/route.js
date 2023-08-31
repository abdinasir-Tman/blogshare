import UserPost from "@/models/post";
import { ConnectToDb } from "@/util/database";
//Register Post
export const POST = async (request) => {
  const { title, content, author } = await request.json();

  try {
    await ConnectToDb();
    const newPost = new UserPost({
      title,
      content,
      author,
    });
    await newPost.save();
    return new Response("Registered Successfully", { status: 200 });
  } catch (e) {
    return new Response("Post Could Not Create ", {
      status: 500,
    });
  }
};

// Read Posts
export const GET = async (req) => {
  try {
    await ConnectToDb();
    const posts = await UserPost.find({}).populate("author");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (e) {
    return new Response("Filed to Read", { status: 500 });
  }
};
