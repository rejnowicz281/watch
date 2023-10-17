import GithubProvider from "next-auth/providers/github";

const authOptions = {
    providers: [GithubProvider({ clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET })],
    callbacks: {
        async session({ session, token }) {
            if (session?.user) session.user._id = token.sub;

            return session;
        },
    },
};

export default authOptions;
