"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings2 } from "lucide-react";

export default function Page() {
  return (
    <Card className="w-4/5 mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings2 className="h-6 w-6" />
            <CardTitle>Settings</CardTitle>
          </div>
          <CardDescription>Manage your account settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label>Profile Settings</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">Change Avatar</Button>
                <Button variant="outline" className="justify-start">Edit About Me</Button>
                <Button variant="outline" className="justify-start">Manage Connections</Button>
                <Button variant="outline" className="justify-start">Change Email</Button>
              </div>
            </div>
            
            <Separator />

            <div>
              <Label>Appearance</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-zinc-500 dark:text-zinc-400">Preferred Theme</Label>
                  <Select defaultValue="system">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Preferred Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-zinc-500 dark:text-zinc-400">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-zinc-500 dark:text-zinc-400">Preferred Navigation</Label>
                  <Select defaultValue="sidebar">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Preferred Navigation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sidebar">Sidebar</SelectItem>
                      <SelectItem value="navbar">Navigation Bar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-zinc-500 dark:text-zinc-400">Version</Label>
                  <Select defaultValue="stable">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stable">Stable</SelectItem>
                      <SelectItem value="beta">Beta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Label>Advertisement Settings</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-zinc-500 dark:text-zinc-400">Marketing Emails</Label>
                  <Select defaultValue="subscribed">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Marketing Emails" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subscribed">Subscribed</SelectItem>
                      <SelectItem value="important">Important Only</SelectItem>
                      <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-zinc-500 dark:text-zinc-400">Ad Frequency</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Ad Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="reduced">Reduced</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Button variant="outline" className="justify-start w-85">Delete Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>
  );
}
  