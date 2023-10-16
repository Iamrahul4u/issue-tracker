import React from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";

interface BadgeProps {
  status: Status;
}
const BadgeComponent = ({ status }: BadgeProps) => {
  return (
    <Badge
      color={`${
        status === "OPEN" ? "red" : status === "CLOSED" ? "green" : "violet"
      }`}
    >
      {status}
    </Badge>
  );
};

export default BadgeComponent;
