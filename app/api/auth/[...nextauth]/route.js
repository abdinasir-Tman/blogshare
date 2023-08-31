import User from "@/models/users";
import { ConnectToDb } from "@/util/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const userSession = await User.findOne({
        email: session.user.email,
      });

      session.user.id = userSession._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await ConnectToDb();
        const existUser = await User.findOne({ email: profile.email });
        if (!existUser) {
          await User.create({
            email: profile.email,
            username: profile.username.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
