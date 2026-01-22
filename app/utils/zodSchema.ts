import { z } from "zod";

// Onboarding Schema
export const onboardingSchema = z.object({
    firstName: z.string().min(2, "First Name is Required"),
    lastName: z.string().min(2, "Last Name is Required"),
    businessName: z.string().min(2, "Business Name is Required"),
    address: z.string().min(2, "Address is Required"),
});

// Invoice Item Schema
export const invoiceItemSchema = z.object({
    id: z.string(),
    description: z.string().min(1, "Item description is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(0, "Price must be positive"),
});

// Invoice Schema with User Relation
export const createInvoiceSchema = z.object({
    // Invoice Header
    invoiceNumber: z.string().min(1, "Invoice number is required"),
    date: z.date({
        required_error: "Invoice date is required",
    }),
    dueDate: z.date({
        required_error: "Due date is required",
    }).optional(),
    currency: z.enum(["USD", "EUR", "GBP", "INR"], {
        required_error: "Currency is required",
    }),

    // From (Sender/Business) - Auto-populated from logged-in user
    fromName: z.string().min(2, "Your name/business name is required"),
    fromEmail: z.string().email("Valid email is required"),
    fromAddress: z.string().min(5, "Your address is required"),

    // To (Client/Recipient)
    toName: z.string().min(2, "Client name is required"),
    toEmail: z.string().email("Valid client email is required"),
    toAddress: z.string().min(5, "Client address is required"),

    // Line Items
    items: z.array(invoiceItemSchema).min(1, "At least one item is required"),

    // Tax and Notes
    taxRate: z.number().min(0, "Tax rate must be at least 0%"),
    taxName: z.string().min(1, "Tax name is required"),
    discount: z.number().min(0, "Discount must be at least 0%").max(100, "Discount cannot exceed 100%").default(0),
    notes: z.string().optional(),

    // User Relation (for backend)
    userId: z.string().cuid().optional(), // Will be set server-side from session

    // Asset References (Base64)
    companyLogo: z.string().optional(),
    signature: z.string().optional(),
});

// Type inference for TypeScript
export type InvoiceItem = z.infer<typeof invoiceItemSchema>;
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
