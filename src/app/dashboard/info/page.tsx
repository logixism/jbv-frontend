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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FaDiscord, FaTwitter, FaReddit } from "react-icons/fa";
import { RobloxIcon } from "@/components/icons/roblox";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

export default function Page() {
  const { user, settings } = useAuth();

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
                    <Avatar className="h-32 w-32 border-4 dark:border-zinc-800 border-zinc-200">
                        <AvatarImage src={user?.roblox.picture} alt="Profile Picture" />
                    </Avatar>
                </div>

                <div className="flex-1">
                    <div className="space-y-4">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">{user?.roblox.displayName}</h2>
                        <span className="dark:text-zinc-400 text-zinc-500 text-sm">{user?.roblox.userName}</span>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary">Member</Badge> {/* badges will prob have icons too */}
                        <Badge variant="secondary">Trade Expert</Badge>
                        <Badge variant="secondary">Value Team</Badge>
                    </div>

                    <div className="space-y-2">
                        <Label>About Me</Label>
                        <div className="dark:bg-zinc-800 bg-zinc-100 rounded-md p-3">{settings?.aboutMe}</div>
                    </div>

                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4" />
                            Connected Accounts
                        </Label>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                                <RobloxIcon width={1} height={1} className="text-[#ffff]" />
                                {user?.roblox.userName}
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <FaDiscord className="h-4 w-4 text-[#5865F2]" />
                                {user?.roblox.userName}
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <FaTwitter className="h-4 w-4 text-[#1DA1F2]" />
                                {user?.roblox.userName}
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <FaReddit className="h-4 w-4 text-[#FF4500]" />
                                {user?.roblox.userName}
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
                            <div>{new Date(user?.roblox.createdAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
  