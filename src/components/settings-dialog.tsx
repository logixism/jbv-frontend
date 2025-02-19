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
import { useIsMobile } from "@/hooks/use-mobile";
const SettingsDialog = ({
  trigger,
  ...props
}: {
  trigger: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const [preferredNavMethod, setPreferredNavMethod, _removePreferredNavMethod] =
    useLocalStorage("preferredNavMethod", "sidebar");

  const [preferredFont, setPreferredFont, _removePreferredFont] =
    useLocalStorage("preferredFont", "Montserrat");

  const settings = {
    preferredNavMethod: {
      visibleOnMobile: false,
      label: "Preferred navigation method",
      value: preferredNavMethod,
      onChange: setPreferredNavMethod,
      options: [
        { value: "sidebar", label: "Sidebar" },
        { value: "navbar", label: "Topbar" },
      ],
    },
    preferredFont: {
      visibleOnMobile: true,
      label: "Preferred font",
      value: preferredFont,
      onChange: setPreferredFont,
      options: [
        { value: "Montserrat", label: "Montserrat" },
        { value: "Arial", label: "Arial" },
        { value: "Times New Roman", label: "Times New Roman" },
      ],
    },
  };

  const isMobile = useIsMobile();

  return (
    <Dialog {...props} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {Object.entries(settings).map(([key, values]) => (
            <div
              key={key}
              className="flex items-center justify-between"
              style={{
                display: isMobile && !values.visibleOnMobile ? "none" : "flex",
              }}
            >
              <p>{values.label}</p>
              <Select
                defaultValue={values.value}
                onValueChange={values.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={values.options[0].label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {values.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
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
