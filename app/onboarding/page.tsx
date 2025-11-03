"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/SubmitButtons";

export default function OnboardingPage() {
    async function handleSubmit(formData: FormData) {
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const business = formData.get('business') as string;
        const address = formData.get('address') as string;
        console.log({ firstName, lastName, business, address });
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f9fafb] p-4">
            <form action={handleSubmit} className="w-full max-w-md">
                <Card className="border-0 shadow-sm">
                    <CardHeader className="space-y-1 text-center">
                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="white" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                className="h-6 w-6"
                            >
                                <path d="M12 2v20M2 12h20" />
                            </svg>
                        </div>
                        <CardTitle className="text-2xl font-semibold">You're Almost Finished!</CardTitle>
                        <CardDescription className="text-base text-gray-600">
                            Enter your details to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                                <Input 
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="John"
                                    required
                                    className="h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                                <Input 
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    required
                                    className="h-10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="business" className="text-sm font-medium">Business Name</Label>
                            <Input 
                                id="business"
                                name="business"
                                type="text"
                                placeholder="My Business"
                                required
                                className="h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-sm font-medium">Business Address</Label>
                            <Input 
                                id="address"
                                name="address"
                                type="text"
                                placeholder="123 Business St, City, Country"
                                required
                                className="h-10"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <SubmitButton  text="Finish Onboarding" className="w-full h-10 bg-black hover:bg-gray-900"/>
                            
                        
                        <p className="text-xs text-gray-500 text-center">
                            By continuing, you agree to our{' '}
                            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
                            and{' '}
                            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                        </p>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}