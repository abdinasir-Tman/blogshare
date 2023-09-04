import { UserPost } from "@/models/models";
import { ConnectToDb } from "@/util/database";

export const GET = async (req, { params }) => {
  try {
    await ConnectToDb();
    const usersPost = await UserPost.find({ author: params.id }).populate(
      "author"
    );

    return new Response(JSON.stringify({ status: 200, message: usersPost }));
  } catch (e) {
    return new Response("Failed to Read");
  }
};
export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await ConnectToDb();
    await UserPost.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({ status: 200, message: "Deleted  successfully" })
    );
  } catch (e) {
    return new Response("Failed to Delete");
  }
};
export const PATCH = async (req, { params }) => {
  const { id } = req.params;
  const { title, content } = await req.json();
  try {
    await ConnectToDb();
    await UserPost.findByIdAndUpdate(id, {
      title,
      content,
    });
    return new Response(
      JSON.stringify({ status: 200, message: "Updated  successfully" })
    );
  } catch (e) {
    return new Response("Failed to Update");
  }
};
