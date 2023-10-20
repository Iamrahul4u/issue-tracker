import React from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};
export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Edit Issue",
};
export default EditIssuePage;
