import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { Tweet } from "react-tweet";

export function RightSidebar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsVisible(window.innerWidth > 2255);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="block w-[260px] ml-17">
        <Link href="https://discord.gg/jbvalues" target="_blank" rel="noopener noreferrer">
            <img
            style={{ borderRadius: "15px" }}
            src="https://discord.com/api/guilds/1024713361985896508/widget.png?style=banner4"
            alt="Discord Banner"
            />
        </Link>
        <Tweet id="1894447798768341380" />
    </div>
  );
}