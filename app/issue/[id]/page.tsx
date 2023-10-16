import BadgeComponent from "@/app/components/Badge";
import prisma from "@/prisma/client";
import { Flex, Heading } from "@radix-ui/themes";
import { Card } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Prop {
  params: { id: string };
}
const IssueDetails = async ({ params }: Prop) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue) notFound();
  return (
    <div>
      <Heading>{issue.title.toUpperCase()}</Heading>
      <Flex gap='2' mb='2'>
        <p>{issue.createdAt.toDateString()}</p>
        <BadgeComponent status={issue.status} />
      </Flex>
      <Card>{issue.description}</Card>
    </div>
  );
};

export default IssueDetails;
