import { Status } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssuesStats = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    Status: Status;
  }[] = [
    { label: "Open", value: open, Status: Status.OPEN },
    { label: "In Progress", value: inProgress, Status: Status.IN_PROGRESS },
    { label: "Closed", value: closed, Status: Status.CLOSED },
  ];
  return (
    <Flex gap='2' mb='4'>
      {containers.map((container) => (
        <Flex
          key={container.label}
          direction='column'
          className='border-gray-600 border-2 text-gray-900 rounded-lg px-2 py-1'
        >
          <Link href={`/issue/?status=${container.Status}`}>
            <Text size='2' className=' font-medium'>
              {container.label} Issues
            </Text>
          </Link>
          <Text size='7' className=' font-bold'>
            {container.value}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default IssuesStats;
