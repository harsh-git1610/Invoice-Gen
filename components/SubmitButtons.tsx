"use client";

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    children?: React.ReactNode;
}

export function SubmitButton({ text, children, className, ...props }: SubmitButtonProps) {
    const { pending } = useFormStatus();
    
    const content = text || children;
    
    return (
        <Button 
            type="submit" 
            className={`w-full ${className || ''}`}
            disabled={pending}
            {...props}
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                </>
            ) : (
                content
            )}
        </Button>
    );
}

