import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const metadata = {
    title: "Watch",
    description: "Time tracker app to boost your productivity",
};

export default async function RootLayout({ children }) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        {session ? (
                            <Link href="/api/auth/signout">Sign Out</Link>
                        ) : (
                            <Link href="/api/auth/signin">Sign In</Link>
                        )}
                    </li>
                </ul>
                {children}
            </body>
        </html>
    );
}
