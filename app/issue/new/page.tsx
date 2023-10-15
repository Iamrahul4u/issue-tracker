"use client";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className='space-y-3 max-w-xl'>
      <TextField.Root>
        <TextField.Input placeholder='Title'></TextField.Input>
      </TextField.Root>
      <SimpleMDE placeholder='Description' />
      <Button>Submit</Button>
    </div>
  );
};

export default NewIssuePage;
