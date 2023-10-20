"use client";
import { Status, issue } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

interface Props {
  searchParams: { status: Status; orderBy: keyof issue };
}

const order: {
  label: string;
  value?: keyof issue;
  className: string;
}[] = [
  {
    label: "Issue",
    value: "title",
    className: "",
  },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];
const ToggleHeader = ({ searchParams }: Props) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  return (
    <Table.Header>
      <Table.Row>
        {order.map((orderBy) => {
          return (
            <Table.ColumnHeaderCell
              key={orderBy.value}
              className={orderBy.className}
            >
              <Link
                onClick={toggleSortDirection}
                href={{
                  query: {
                    ...searchParams,
                    orderBy: orderBy.value,
                    sort: sortDirection,
                  },
                }}
              >
                {orderBy.label}
              </Link>
              {orderBy.value == searchParams.orderBy &&
                (sortDirection == "asc" ? (
                  <AiOutlineArrowUp className='ml-2 text-gray-500 inline' />
                ) : (
                  <AiOutlineArrowDown className='ml-2 text-gray-500 inline' />
                ))}
            </Table.ColumnHeaderCell>
          );
        })}
      </Table.Row>
    </Table.Header>
  );
};

export default ToggleHeader;
