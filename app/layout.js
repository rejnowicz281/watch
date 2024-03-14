import Sidebar from "@/components/sidebar";
import TimersContainer from "@/components/sidebar/timers-container";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata = {
    title: "Watch",
    description: "Time Tracking Made Simple",
};

export default function RootLayout({ children }) {
    return (
        <html className="h-full" lang="en">
            <body className="min-h-full flex flex-col">
                <NextTopLoader height={4} showSpinner={false} />
                <div className="flex-1 flex flex-col lg:flex-row-reverse">
                    <div className="flex-1 flex relative">
                        <div id="main-section" className="absolute inset-0 overflow-y-auto flex flex-col flex-1">
                            <div id="main-section-children" className="flex flex-col flex-1">
                                {children}
                            </div>
                        </div>
                    </div>

                    <Sidebar TimersContainer={<TimersContainer />} />
                </div>
            </body>
        </html>
    );
}
