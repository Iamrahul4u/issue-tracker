import BadgeComponent from "@/app/components/Badge";
import { Box, Heading, Flex, Card } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import Markdown from "react-markdown";

const IssueDeatilsLoading = () => {
  return (
    <Box>
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap='2' mb='2'>
        <Skeleton />
        <Skeleton />
      </Flex>
      <Card className='prose'>
        <Skeleton />
      </Card>
    </Box>
  );
};

export default IssueDeatilsLoading;
