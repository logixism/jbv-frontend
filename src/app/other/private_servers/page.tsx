"use client";

import { useLocalStorage } from "usehooks-ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { CircleDollarSign, Handshake } from "lucide-react";
import Link from "next/link";

function generateRuleHash(rules: string[]) {
  let hash = 0;
  for (const rule of rules) {
    for (let i = 0; i < rule.length; i++) {
      const chr = rule.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
  }
  return hash;
}

const rules = ["No exploiting", "No arresting", "No trolling", "No toxicity"];
const servers = [
  {
    name: "Crimson's Cove",
    owner: "cancle5",
    type: "Trading",
    url: "https://jbvalues.com",
  },
  {
    name: "Midnight Mirage",
    owner: "cancle5",
    type: "Grinding",
    url: "https://jbvalues.com",
  },
  {
    name: "Aurora's Abyss",
    owner: "cancle5",
    type: "Grinding",
    url: "https://jbvalues.com",
  },
  {
    name: "Sapphire Sanctuary",
    owner: "cancle5",
    type: "Trading",
    url: "https://jbvalues.com",
  },
  {
    name: "Onyx Oasis",
    owner: "cancle5",
    type: "Grinding",
    url: "https://jbvalues.com",
  },
  {
    name: "Emerald Empire",
    owner: "cancle5",
    type: "Trading",
    url: "https://jbvalues.com",
  },
];

export default function Page() {
  const [hasReadVIPRules, setHasReadVIPRules, removeHasReadVIPRules] =
    useLocalStorage<null | number>("hasReadVIPRules", null);

  const [secondsRemaining, setSecondsRemaining] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(secondsRemaining - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining]);

  return (
    <div>
      <AlertDialog
        open={
          hasReadVIPRules === null ||
          generateRuleHash(rules) !== hasReadVIPRules
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>JBValues Private Server Rules</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            <ul className="font-semibold">
              {rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
            <br />
            Breaking any of these rules will result in a ban from all of our
            private servers.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction
              disabled={secondsRemaining > 0}
              onClick={() => {
                setHasReadVIPRules(generateRuleHash(rules));
              }}
            >
              {secondsRemaining > 0
                ? `${secondsRemaining}s left, take your time to read the rules`
                : "I understand and accept these rules"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="mb-6 flex items-center flex-col border-zinc-800 border rounded-lg p-4">
        <h1 className="font-bold text-3xl">Jailbreak Private Servers</h1>
        <div className="text-zinc-500 mx-auto w-300 flex flex-col items-center mt-4">
          <p>
            Here are some free private Roblox Jailbreak VIP servers where you
            can grind and do contracts without having to worry about cops or
            exploiters.
          </p>
          <p>
            These servers are sponsored by Jailbreak Values, so we can ensure
            peace of mind for our players.
          </p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(24rem,1fr))]">
        {servers.map((server) => (
          <Link
            href={server.url}
            style={{
              backgroundSize: "cover",
              backgroundImage:
                server.type === "Grinding"
                  ? "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('https://jbvalues.com/images/backgroundtomb.png')"
                  : "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('https://jbvalues.com/images/jailbreaktradingislanddark.webp')",
            }}
            className="p-4 border border-zinc-800 rounded-lg hover:scale-105 transition text-white"
            key={server.name}
          >
            <p className="flex flex-row items-center text-sm">
              {server.type === "Grinding" ? (
                <CircleDollarSign className="mr-2 size-4" />
              ) : (
                <Handshake className="mr-2 size-4" />
              )}
              {server.type}
            </p>
            <h4 className="font-semibold text-lg">{server.name}</h4>
            <div className="flex flex-row justify-between mt-1">
              <p className="font-medium">Owner</p>
              <p className="font-semibold">{server.owner}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
