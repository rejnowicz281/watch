import Link from "next/link";

export const metadata = {
    title: "Watch",
    description: "Time tracker app to boost your productivity",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                </ul>
                {children}
            </body>
        </html>
    );
}
