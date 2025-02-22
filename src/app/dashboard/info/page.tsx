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
import { User, Link as LinkIcon } from "lucide-react";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { FaDiscord, FaTwitter, FaReddit } from "react-icons/fa";
import { RobloxIcon } from "@/components/icons/roblox";

export default function Page() {
  return (
    <Card className="w-4/5 mx-auto">
        <CardHeader>
            <div className="flex items-center gap-2">
            <User className="h-6 w-6" />
            <CardTitle>User Information</CardTitle>
            </div>
            <CardDescription>Your account profile and information</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
                <div>
                    <ImageWithFallback
                        src="https://cdn.discordapp.com/avatars/794242384065986561/2200ee7043ac0949189db770d71c403d.webp"
                        fallbackSrc="/fallback.png"
                        alt="Profile Picture"
                        width={128}
                        height={128}
                        className="rounded-full border-4 dark:border-zinc-800 border-zinc-200"
                    />
                </div>

                <div className="flex-1">
                    <div className="space-y-4">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">ryan</h2>
                        <span className="dark:text-zinc-400 text-zinc-500 text-sm">@cancle5</span>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary">Member</Badge> {/* badges will prob have icons too */}
                        <Badge variant="secondary">Trade Expert</Badge>
                        <Badge variant="secondary">Value Team</Badge>
                    </div>

                    <div className="space-y-2">
                        <Label>About Me</Label>
                        <div className="dark:bg-zinc-800 bg-zinc-100 rounded-md p-3">Owner of JB Values. Here to manipulate values!</div>
                    </div>

                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4" />
                            Connected Accounts
                        </Label>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                                <RobloxIcon width={1} height={1} className="text-[#ffff]" />
                                @cancle5
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <FaDiscord className="h-4 w-4 text-[#5865F2]" />
                                @cancle5
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <FaTwitter className="h-4 w-4 text-[#1DA1F2]" />
                                @canclee5
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <FaReddit className="h-4 w-4 text-[#FF4500]" />
                                u/cancle5
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label className="text-zinc-500 dark:text-zinc-400">Email</Label>
                            <div>ryan@jbvalues.com</div>
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-zinc-500 dark:text-zinc-400">User Since</Label>
                            <div>January 1, 2024</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
  