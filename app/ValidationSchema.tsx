import z from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export const PatchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z.string().min(1, "Description is required").optional(),
  assignedToUserId: z
    .string()
    .min(1, "User Id can't be null")
    .max(255)
    .optional()
    .nullable(),
});
