import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import BadgeComponent from "../components/Badge";
import IssueActions from "./list/IssueActions";
import Link from "../components/Link";
import { Status, issue } from "@prisma/client";
import ToggleHeader from "./_components/ToggleHeader";
import PaginationFilter from "./_components/PaginationFilter";
import { Metadata } from "next";
const Issue = async ({
  searchParams,
}: {
  searchParams: {
    status: Status;
    orderBy: keyof issue;
    sort: string;
    page: string;
  };
}) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy: {
      [searchParams.orderBy]: searchParams.sort,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({
    where: {
      status,
    },
  });
  return (
    <div className='max-w-4xl'>
      <IssueActions />
      <Table.Root variant='surface'>
        <ToggleHeader searchParams={searchParams} />
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issue/${issue.id}`}>{issue.title}</Link>
                  <div className='md:hidden'>
                    <BadgeComponent status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <BadgeComponent status={issue.status} />
                </Table.Cell>
                <Table.Cell className='hidden md:block'>
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <PaginationFilter
        totalItems={issueCount}
        pageSize={pageSize}
        pageNumber={page}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "List of Issues",
};
export const dynamic = "force-dynamic";
export default Issue;
