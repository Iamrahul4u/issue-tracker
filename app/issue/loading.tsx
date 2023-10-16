import { Table } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BadgeComponent from "../components/Badge";
import IssueActions from "../components/IssueActions";
const IssuesLoading = () => {
  // dummy issues for skeleton loading
  const issues = [1, 2, 3, 4];
  return (
    <div className='max-w-4xl'>
      <IssueActions />
      <Table.Root className='mt-5' variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Description
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Skeleton />
                  <div className='md:hidden'>
                    <Skeleton />
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <Skeleton />
                </Table.Cell>
                <Table.Cell className='hidden md:block'>
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesLoading;
