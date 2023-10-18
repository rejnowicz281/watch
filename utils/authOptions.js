import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GithubProvider from "next-auth/providers/github";
import { connectToDB } from "./database";

const authOptions = {
    adapter: MongoDBAdapter(connectToDB()),
    providers: [GithubProvider({ clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET })],
    callbacks: {
        async session({ session, user }) {
            if (session?.user) session.user._id = user.id;

            return session;
        },
    },
};

export default authOptions;
