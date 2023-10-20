import React from "react";
import PaginationFilter from "./issue/_components/PaginationFilter";
import { Avatar, Card, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import BadgeComponent from "./components/Badge";
import ToggleHeader from "./issue/_components/ToggleHeader";
import page from "./issue/page";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      assignedToUser: true,
    },
    take: 10,
  });
  return (
    <Card variant='surface'>
      <Heading mb='2' ml='3' size='7'>
        Recent Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify='between' align={"center"}>
                    <Flex direction={"column"} align='start' mb='1' pb='1'>
                      <Link
                        href={`/issue/${issue.id}`}
                        className='text-base font-medium mb-2'
                      >
                        {issue.title}
                      </Link>
                      <BadgeComponent status={issue.status} />
                    </Flex>
                    {issue.assignedToUserId && (
                      <Avatar
                        src={issue.assignedToUser!.image!}
                        radius='full'
                        fallback='?'
                        size={"2"}
                        className='cursor-pointer '
                        referrerPolicy='no-referrer'
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
