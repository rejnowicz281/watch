import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: async ({ req: { cookies } }) => {
            const secureCookie = process.env.NEXTAUTH_URL?.startsWith("https://") ?? !!process.env.VERCEL;
            const cookieName = secureCookie ? "__Secure-next-auth.session-token" : "next-auth.session-token";
            const session = await (
                await fetch(`${process.env.BASE_URL}/api/auth/session`, {
                    method: "GET",
                    headers: { Cookie: `${cookieName}=${cookies.get(cookieName)?.value}` },
                })
            ).json();
            return !!session.user;
        },
    },
});

export const config = { matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)"] };
