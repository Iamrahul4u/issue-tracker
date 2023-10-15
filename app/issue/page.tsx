import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const Issue = () => {
  return (
    <div>
      <Button>
        <Link className='text-lg' href='/issue/new'>
          New Issue
        </Link>
      </Button>
    </div>
  );
};

export default Issue;
