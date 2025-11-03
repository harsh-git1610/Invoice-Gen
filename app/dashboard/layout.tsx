import { requireUser } from "../utils/hooks";
import SidebarDemo from "@/components/sidebar-demo";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await requireUser();
    
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 flex">
            <div className="relative">
                <SidebarDemo />
                <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent dark:via-gray-800"></div>
            </div>
            <main className="flex-1 overflow-auto p-6">
                {children}
            </main>
        </div>
    );
}