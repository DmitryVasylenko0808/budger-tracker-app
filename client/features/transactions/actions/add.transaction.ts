import { z } from "zod";
import { createTransaction } from "../api";

const addTransactionSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  amount: z.preprocess(
    (val) => Number(val),
    z.number().gt(0, "Amount must be greater than 0")
  ),
  categoryId: z.preprocess(
    (val) => Number(val),
    z.number({ message: "Invalid category" })
  ),
  createdAt: z.preprocess(
    (val) => new Date(val as string),
    z.date({ message: "Date is required" })
  ),
  notes: z.string().trim().optional(),
});

type AddTransactionState = {
  errors?: {
    name?: string[];
    amount?: string[];
    categoryId?: string[];
    createdAt?: string[];
    notes?: string[];
    server?: string;
  };
  success?: boolean;
} | null;

export const addTransactionAction = async (
  prevState: AddTransactionState,
  formData: FormData
): Promise<AddTransactionState> => {
  const validatedFields = addTransactionSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
    categoryId: formData.get("categoryId"),
    createdAt: formData.get("createdAt"),
    notes: formData.get("notes"),
  });

  console.log(validatedFields.data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const res = await createTransaction(validatedFields.data);

  if (res.error) {
    return {
      errors: {
        server: res.message,
      },
      success: false,
    };
  }

  return { success: true };
};
