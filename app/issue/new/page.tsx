"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
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
  const [error, setError] = useState("");
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issue");
    } catch {
      setError("An Unexpected Error Occured");
    }
  };

  return (
    <div className='max-w-xl space-y-3'>
      {error && (
        <Callout.Root color='red'>
          <Callout.Text>
            <p>{error}</p>
          </Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3 ' onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
};

export default NewIssuePage;
