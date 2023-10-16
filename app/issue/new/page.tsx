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
  const [submit, setSubmit] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setSubmit(true);
      await axios.post("/api/issues", data);
      router.push("/issue");
      setSubmit(false);
    } catch {
      setError("An Unexpected Error Occured");
    } finally {
      setSubmit(false);
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
        <Button>
          <div className={`${submit ? "block" : "hidden"}`}>
            <div className='border-t-transparent animate-spin rounded-full border-white-400 border-2 h-4 w-4'></div>
          </div>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
