"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState } from "react";
import LoadingSpinner from "../../_components/LoadingSpinner";

const EditButton = ({ issueId }: { issueId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button className='cursor-pointer ' mt={{ md: "2", initial: "5" }}>
      <LoadingSpinner visible={isLoading} />
      <Link
        className='w-full text-center'
        href={`/issue/${issueId}/edit`}
        onClick={() => setIsLoading(!isLoading)}
      >
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditButton;
