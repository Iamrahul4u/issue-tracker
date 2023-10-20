"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const issuesFilter: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const IssueFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status !== " " ? `?status=${status}` : "";
        router.push("/issue" + query);
      }}
    >
      <Select.Trigger placeholder='Select' />
      <Select.Content position='popper'>
        <Select.Group>
          {issuesFilter.map((item) => (
            <Select.Item value={item.value || " "} key={item.label}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;
