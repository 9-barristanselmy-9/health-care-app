import { z } from "zod";

export const UsreFormValidation = z.object({
    username: z.string()
    .min(2,"Username must be at least 2 characters.")
    .max(50,"Username must be at most 50 characters"),
    email: z.string()
    .email("Invalid email"),
    phone: z.string().refine((phone)=>  /^(?:\+216)?[0-9]{8}$/.test(phone),'Invalide phone number')
  });