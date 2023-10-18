import dynamic from "next/dynamic"
import React from "react"
const IssueForm = dynamic(() => import("@/app/issue/_components/IssueForm"), {
  ssr: false,
})
const NewIssue = () => {
  return <IssueForm />
}

export default NewIssue
