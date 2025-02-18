"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { useCallback, useState } from "react";
import { useTheme } from "next-themes";
import { useLocalStorage } from "usehooks-ts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SettingsDialog = ({
  trigger,
  ...props
}: {
  trigger: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const [selectedNavMethod, setSelectedNavMethod, _] = useLocalStorage(
    "selectedNavMethod",
    "sidebar"
  );

  return (
    <Dialog {...props} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex items-center justify-between">
            <p>Preferred navigation method</p>
            <Select
              defaultValue={selectedNavMethod}
              onValueChange={setSelectedNavMethod}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sidebar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="sidebar">Sidebar</SelectItem>
                  <SelectItem value="navbar">Topbar</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex justify-end">
          <Button onClick={() => setOpen(false)} variant="outline">
            Exit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
