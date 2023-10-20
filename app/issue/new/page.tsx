import { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";
const IssueForm = dynamic(() => import("@/app/issue/_components/IssueForm"), {
  ssr: false,
});
const NewIssue = () => {
  return <IssueForm />;
};
export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Create Issue",
};
export default NewIssue;
