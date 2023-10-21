"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import LoadingSpinner from "../../_components/LoadingSpinner";
import Link from "next/link";
import { Island_Moments } from "next/font/google";

const OnDelete = ({ id }: { id: string }) => {
  const router = useRouter();
  const [error, setError] = useState(true);
  const [isLoading, setLoading] = useState(false);
  async function deleteIssue() {
    try {
      setLoading(true);
      await axios.delete(`/api/issues/${id}`);
      router.push("/issue");
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>
          <LoadingSpinner visible={isLoading} />
          {isLoading ? "Deleting..." : "Delete Issue"}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description size='2'>
          Are you sure? This operation cannot be Undone.
        </AlertDialog.Description>

        <Flex gap='3' mt='4' justify='end'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant='solid'
              color='red'
              className='bg-red-600 text-white'
              onClick={() => deleteIssue()}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default OnDelete;
