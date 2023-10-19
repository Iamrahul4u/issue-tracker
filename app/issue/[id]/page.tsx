import BadgeComponent from "@/app/components/Badge"
import prisma from "@/prisma/client"
import { Box, Button, Flex, Grid, Heading } from "@radix-ui/themes"
import { Card } from "@radix-ui/themes"
import Link from "next/link"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import onDelete from "./edit/DeleteIssue"
import OnDelete from "./edit/DeleteIssue"
import LoadingSpinner from "../_components/LoadingSpinner"
import EditButton from "./edit/EditButton"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/auth/providerOptions"

interface Prop {
  params: { id: string }
}

const IssueDetails = async ({ params }: Prop) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  })
  if (!issue) notFound()
  const session = await getServerSession(authOptions)
  return (
    <Grid columns={{ initial: "1", md: "5" }} gap={"4"}>
      <Box className='col-span-3'>
        <Heading>{issue.title.toUpperCase()}</Heading>
        <Flex gap='2' mb='2'>
          <p>{issue.createdAt.toDateString()}</p>
          <BadgeComponent status={issue.status} />
        </Flex>
        <Card className='prose'>
          <Markdown>{issue.description}</Markdown>
        </Card>
      </Box>
      <Box>
        {session && (
          <Flex direction={"column"} gap={"2"} mt='5'>
            <EditButton issueId={issue.id} />
            <OnDelete id={issue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  )
}
export default IssueDetails
