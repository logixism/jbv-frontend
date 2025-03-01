"use client";

import Image from "next/image";
import { useState } from "react";

export const ImageWithFallback = (props: {
  [x: string]: unknown;
  src: string | null;
  fallbackSrc: string;
}) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      alt={""}
      {...rest}
      src={imgSrc || fallbackSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};
