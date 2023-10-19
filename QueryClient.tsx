"use client";
import { PropsWithChildren } from "react";
import {
  useQuery,
  QueryClient as QueryClientInit,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClientInit();
const QueryClient = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClient;
