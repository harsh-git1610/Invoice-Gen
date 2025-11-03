import { buttonVariants } from "@/components/ui/button";
import { Card , CardHeader , CardTitle , CardDescription , CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, ArrowLeft,  Mail } from "lucide-react"
import Link from "next/link";

export default function Verify() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-[400px] px-5">
                <CardHeader className="text-center">    
                    <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary items-center">
                        <Mail className="size-12 text-primary-foreground"/>
                    </div>
                    <CardTitle className="text-2xl font-bold ">Verify your email</CardTitle>
                    <CardDescription className="text-muted-foreground ">
                        Please check your email for the verification code.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mt-4 rounded-md bg-yellow-50 border-yellow-500 p-4">
                        <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-yellow-500"/>
                        <p className="text-sm font-medium  text-yellow-700 ml-3">Make Sure to check the Spam Folder </p>
                    </div>
                    </div>
                    
                </CardContent>
                <CardFooter>
                    <Link href = "/"
                    className={buttonVariants({
                        variant:"outline",
                        className:"w-full"
                    })}
                    >
                    <ArrowLeft className ="size-4  mr-2 "/>Back To Homepage 

                    
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
    