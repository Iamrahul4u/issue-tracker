"use client"
import { Button, Callout, TextField } from "@radix-ui/themes"
import { useState } from "react"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import { issue } from "@prisma/client"
import { platform } from "os"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import LoadingSpinner from "./LoadingSpinner"

type Inputs = {
  title: string
  description: string
}

const IssueForm = ({ issue }: { issue?: issue }) => {
  const router = useRouter()
  const { register, handleSubmit, control } = useForm<Inputs>()
  const [error, setError] = useState("")
  const [submit, setSubmit] = useState(false)
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setSubmit(true)
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data)
      else await axios.post("/api/issues", data)
      router.push("/issue")
      router.refresh()
    } catch {
      setError("An Unexpected Error Occured")
    } finally {
      setSubmit(false)
    }
  }

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
            defaultValue={issue?.title}
            placeholder='Title'
            {...register("title")}
          ></TextField.Input>
        </TextField.Root>
        <Controller
          control={control}
          name='description'
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <Button>
          <LoadingSpinner visible={submit} />
          {issue ? "Update Issue" : "Submit"}
        </Button>
      </form>
    </div>
  )
}
export default IssueForm
