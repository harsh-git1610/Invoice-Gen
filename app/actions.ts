"use server";

import { auth as clerkAuth } from "@clerk/nextjs/server";
import { prisma } from "@/app/utils/db";
import { createInvoiceSchema } from "@/app/utils/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function createInvoice(prevState: unknown, formData: FormData) {
    const { userId } = await clerkAuth();

    if (!userId) {
        return {
            status: "error" as const,
            error: {
                "": ["You must be logged in to create an invoice"],
            },
        };
    }

    const submission = parseWithZod(formData, {
        schema: createInvoiceSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = submission.value;

    await prisma.invoice.create({
        data: {
            invoiceNumber: data.invoiceNumber,
            date: data.date,
            dueDate: data.dueDate ?? data.date,
            currency: data.currency,
            fromName: data.fromName,
            fromEmail: data.fromEmail,
            fromAddress: data.fromAddress,
            toName: data.toName,
            toEmail: data.toEmail,
            toAddress: data.toAddress,
            items: data.items as any, // Prisma Json type workaround
            taxRate: data.taxRate,
            taxName: data.taxName,
            discount: data.discount,
            notes: data.notes,
            userId: userId,
            companyLogo: data.companyLogo,
            signature: data.signature,
        },
    });

    return redirect("/dashboard/invoices");
}

