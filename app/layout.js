import "./globals.css";

export const metadata = {
    title: "Watch",
    description: "Time Tracking Made Simple",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
