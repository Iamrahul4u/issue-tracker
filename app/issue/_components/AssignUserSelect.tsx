"use client";
import { SkeletonTemp } from "@/app/components/SkeletonTemplate";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const AssignUserSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      axios.get("http://localhost:3000/api/user").then((res) => res.data),
  });
  if (isLoading) {
    return <SkeletonTemp />;
  }
  if (error) return null;
  return (
    <Select.Root defaultValue='Select'>
      <Select.Trigger />
      <Select.Content position='popper'>
        {users?.map((user) => (
          <Select.Item key={user.id} value={user.id}>
            {user.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default AssignUserSelect;
