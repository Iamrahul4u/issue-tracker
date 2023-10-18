import prisma from "@/prisma/client"
import { Table } from "@radix-ui/themes"
import BadgeComponent from "../components/Badge"
import IssueActions from "../components/IssueActions"
import Link from "../components/Link"

const Issue = async () => {
  const issues = await prisma.issue.findMany()

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
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
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
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
export const dynamic = "force-dynamic"
export default Issue
