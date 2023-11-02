import "./globals.css";
import ModalWrapper from "./timers/[id]/components/ModalWrapper";

export const metadata = {
    title: "Watch",
    description: "Time tracker app to boost your productivity",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ModalWrapper />
                {children}
            </body>
        </html>
    );
}
