import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueFilter from "./IssueFilter";

const IssueActions = () => {
  return (
    <Flex mb='8' justify={"between"}>
      <IssueFilter />
      <Button>
        <Link className='text-lg' href='/issue/new'>
          New Issue
        </Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
