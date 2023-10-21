"use client";
import { SkeletonTemp } from "@/app/components/SkeletonTemplate";
import { User, issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const AssignUserSelect = ({ issue }: { issue: issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/user").then((res) => res.data),
  });
  if (isLoading) {
    return <SkeletonTemp />;
  }
  if (error) return null;
  async function assignUser(userId: string | undefined) {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userId,
      });
    } catch {
      toast.error("Changes Could Not Be Saved");
    }
  }
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(userId) =>
          assignUser(userId !== " " ? userId : undefined)
        }
      >
        <Select.Trigger placeholder='Select User..' />
        <Select.Content position='popper'>
          <Select.Item value=' '>Unassigned</Select.Item>
          <Select.Group className='z-10'>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssignUserSelect;
