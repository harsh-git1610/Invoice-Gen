"use client";
import React, { useState, useRef } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/custom-sidebar"; 
import { cn } from "@/lib/utils"; 
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { ReceiptText, LogOut, User, Settings, ChevronDown, Lock, LockOpen, ChevronUp } from "lucide-react"; 
import { signOut } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const links = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: (
            <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "Inovice",
        href: "#",
        icon: (
            <ReceiptText />
        ),
    },
    
  
];

// --- MAIN COMPONENT ---

export default function SidebarDemo() {
    const [open, setOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [isLocked, setIsLocked] = React.useState(false);
    const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSidebarLeave = () => {
        if (isLocked) return;

        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
        }

        leaveTimeoutRef.current = setTimeout(() => {
            if (!isDropdownOpen) { 
                setOpen(false);
            }
        }, 150);
    };

    const handleSidebarEnter = () => {
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
        }
        setOpen(true);
    };

    const handleLockClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const newLockState = !isLocked;
        setIsLocked(newLockState);
        
        if (newLockState) {
            setOpen(true);
        } else {
            if (!e.currentTarget.closest('.sidebar-container')?.matches(':hover')) {
                handleSidebarLeave();
            }
        }
    }

    return (
        <Sidebar
            open={isLocked || open}
            setOpen={setOpen}
            className={cn(
                "sidebar-container group/sidebar fixed inset-y-0 left-0 z-10 flex h-screen w-[--sidebar-width] flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-950",
                open ? "w-[--sidebar-width-expanded]" : "w-[--sidebar-width-collapsed]"
            )}
            onMouseEnter={handleSidebarEnter} 
            onMouseLeave={handleSidebarLeave}
        >
            <SidebarBody className="justify-between gap-4 h-full">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between px-2 py-1">
                        {open ? <Logo /> : <LogoIcon />}
                        {open && (
                            <button
                                onClick={handleLockClick}
                                className={`p-2 rounded-md transition-colors ${isLocked ? 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                title={isLocked ? 'Unlock sidebar (click to allow auto-close)' : 'Lock sidebar open (click to prevent auto-close)'}
                            >
                                {isLocked ? <Lock className="h-4 w-4" /> : <LockOpen className="h-4 w-4" />}
                            </button>
                        )}
                    </div>
                    <nav className="mt-4 flex flex-col gap-1">
                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} />
                        ))}
                    </nav>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
                    <DropdownMenu onOpenChange={(dropdownOpen) => {
                        setIsDropdownOpen(dropdownOpen);
                        if (dropdownOpen) {
                            setOpen(true); 
                        } else {
                            handleSidebarLeave(); 
                        }
                    }}>
                        <DropdownMenuTrigger asChild>
                            <button className="w-full text-left">
                                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                     <User />
                                    {open && (
                                        <div className="flex items-center justify-between flex-1 min-w-0">
                                            <div className="truncate">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Harsh Chauhan</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">View profile</p>
                                            </div>
                                            <ChevronUp className="h-4 w-4 text-gray-500" />
                                        </div>
                                    )}
                                </div>
                            </button>
                        </DropdownMenuTrigger>
                        
                        {/* 👇 THIS IS THE FIX 👇 */}
                        <DropdownMenuContent 
                            className={cn(
                                // "w-56 transition-all duration-200 ease-in-out",
                                // "data-[side=right]:animate-in data-[side=right]:fade-in-0 data-[side=right]:zoom-in-95",
                                // "data-[side=top]:animate-in data-[side=top]:fade-in-0 data-[side=top]:zoom-in-95"
                            )}
                            align="start" 
                            side={ "top"}
                            sideOffset={5}
                            alignOffset={0}
                            // ADD THESE TWO PROPS
                            onMouseEnter={handleSidebarEnter}
                            onMouseLeave={handleSidebarLeave}
                        >
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <a href="/profile" className="w-full flex items-center ">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href="/settings" className="w-full flex items-center ">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                                className="p-0 text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20"
                                onClick={() => signOut({ callbackUrl: '/' })}
                            >
                                <div className="w-full flex items-center p-2 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </SidebarBody>
        </Sidebar>
    );
}

// --- HELPER COMPONENTS ---

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Invocely
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};