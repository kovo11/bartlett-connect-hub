
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  location: z.string().min(1, { message: "Please select a location" }),
  eventType: z.string().min(1, { message: "Please select an event type" }),
});

export type FormValues = z.infer<typeof formSchema>;
