import React from "react";
import LatestIssues from "./LatestIssues";
import IssuesStats from "./IssuesStats";
import { Metadata } from "next";
import prisma from "@/prisma/client";

const Home = async () => {
  const openIssue = await prisma.issue.findMany({
    where: {
      status: "OPEN",
    },
  });
  const inProgress = await prisma.issue.findMany({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const close = await prisma.issue.findMany({
    where: {
      status: "CLOSED",
    },
  });
  return (
    <>
      <IssuesStats
        open={openIssue.length}
        inProgress={inProgress.length}
        closed={close.length}
      />
      <LatestIssues />
    </>
  );
};
export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Summary of All Issues",
};
export default Home;
