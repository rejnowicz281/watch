import Sidebar from "@/components/general/Sidebar";
import TimersContainer from "@/components/timers/TimersContainer";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import css from "./layout.module.css";

export const metadata = {
    title: "Watch",
    description: "Time Tracking Made Simple",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <NextTopLoader height={4} showSpinner={false} />
                <div className={css.container}>
                    <Sidebar TimersContainer={<TimersContainer />} />
                    <div className={css.main}>{children}</div>
                </div>
            </body>
        </html>
    );
}
