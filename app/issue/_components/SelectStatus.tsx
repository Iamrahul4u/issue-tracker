"use client";
import { SkeletonTemp } from "@/app/components/SkeletonTemplate";
import prisma from "@/prisma/client";
import { User, issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface issueStatus {
  label: string;
  value: "OPEN" | "CLOSED" | "IN_PROGRESS";
}

const SelectStatus = async ({ issue }: { issue: issue }) => {
  const {
    data: issues,
    error,
    isLoading,
  } = useQuery<issue[]>({
    queryKey: ["issues"],
    queryFn: () => axios.get(`/api/issues`).then((res) => res.data),
  });
  const router = useRouter();
  if (isLoading) {
    return <SkeletonTemp />;
  }

  if (error) return null;

  const statuses: issueStatus[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  async function assignStatus(status: string | undefined) {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        status,
      });
      router.refresh();
    } catch {
      toast.error("Changes Could Not Be Saved");
    }
  }
  return (
    <>
      <Select.Root
        defaultValue={issue.status || ""}
        onValueChange={(status) =>
          assignStatus(status !== " " ? status : undefined)
        }
      >
        <Select.Trigger placeholder='Select Status..' />
        <Select.Content position='popper'>
          <Select.Group>
            {statuses?.map((isssuestatus) => (
              <Select.Item key={isssuestatus.label} value={isssuestatus.value}>
                {isssuestatus.value}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default SelectStatus;
