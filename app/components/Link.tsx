import { Link as RadLink } from "@radix-ui/themes";
import NextLink from "next/link";
interface Props {
  href: string;
  children: string;
}

import React from "react";

const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadLink>{children}</RadLink>
    </NextLink>
  );
};

export default Link;
