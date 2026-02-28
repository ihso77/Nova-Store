import { z } from "zod";

// Schema for User Registration
export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional().or(z.literal("")),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for Checkout/Order details
export const checkoutSchema = z.object({
    name: z.string().min(2, "Identification required"),
    email: z.string().email("Invalid terminal address"),
    projectDetails: z.string().min(10, "Project brief must be at least 10 characters"),
});

// Schema for Contact Form
export const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(10),
});
