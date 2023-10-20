"use client";
import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  totalItems: number;
  pageSize: number;
  pageNumber: number;
}
const PaginationFilter = ({ totalItems, pageSize, pageNumber }: Props) => {
  const totalPages: number = Math.ceil(totalItems / pageSize);
  const searchParams = useSearchParams();
  const router = useRouter();

  if (pageNumber < 1) return null;

  function handlePageChange(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push("?" + params.toString());
  }
  return (
    <Flex gap='2' align='center'>
      <Text>
        Page {pageNumber} of {totalPages}
      </Text>
      <Button
        variant='soft'
        onClick={() => handlePageChange(1)}
        disabled={pageNumber === 1}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        variant='soft'
        onClick={() => handlePageChange(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant='soft'
        onClick={() => handlePageChange(pageNumber + 1)}
        disabled={pageNumber === totalPages}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        variant='soft'
        onClick={() => handlePageChange(totalPages)}
        disabled={pageNumber === totalPages}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default PaginationFilter;
