"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { HelpCircle } from "lucide-react";
import { FaDiscord, FaTwitter } from "react-icons/fa";

export default function Page() {
  return (
    <Card className="w-4/5 mx-auto">
        <CardHeader>
            <div className="flex items-center gap-2">
                <HelpCircle className="h-6 w-6" />
                <CardTitle>Support</CardTitle>
            </div>
            <CardDescription>Get help and support for your account</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
                <div className="space-y-2">
                    <Label>Contact Us</Label>
                    <div className="flex flex-col gap-2">
                        <Button variant="outline" className="justify-start gap-2" asChild>
                            <a href="mailto:support@example.com">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                support@jbvalues.com
                            </a>
                        </Button>
                        <Button variant="outline" className="justify-start gap-2" asChild>
                            <a href="https://discord.gg/your-invite" target="_blank" rel="noopener noreferrer">
                                <FaDiscord className="h-5 w-5" />
                                Discord Support
                            </a>
                        </Button>
                        <Button variant="outline" className="justify-start gap-2" asChild>
                            <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="h-5 w-5" />
                                Twitter Messages
                            </a>
                        </Button>
                    </div>
                </div>
                
                <Separator />

                <div className="flex flex-col gap-2">
                    <Button variant="outline" className="justify-start">FAQ</Button>
                    <Button variant="outline" className="justify-start">API Documentation</Button>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
  