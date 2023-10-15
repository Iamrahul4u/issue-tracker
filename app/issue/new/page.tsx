"use client";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

type Inputs = {
  title: string;
  description: string;
};

const NewIssuePage = () => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios.post("/api/issues", data);
    router.push("/issue");
  };

  return (
    <form className='space-y-3 max-w-xl' onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root>
        <TextField.Input
          placeholder='Title'
          {...register("title")}
        ></TextField.Input>
      </TextField.Root>
      <Controller
        control={control}
        name='description'
        render={({ field }) => (
          <SimpleMDE placeholder='Description' {...field} />
        )}
      />
      <Button>Submit</Button>
    </form>
  );
};

export default NewIssuePage;
