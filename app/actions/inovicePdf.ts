'use server'

import { prisma } from "@/app/utils/db"
import { generateInvoicePdf } from "@/app/dashboard/invoices/pdf/generatePdf"
import { auth } from "@clerk/nextjs/server"
import { getOrCreateDbUser } from "../utils/getDbusers"


export async function downloadInvoicePdf(invoiceId: string) {
    const { userId : clerkId }  = await auth()
    if(!clerkId) {
        throw new Error("Not Authenticated")

    }
    const User = await getOrCreateDbUser(clerkId)
    if(!User) {
        throw new Error("User not found")
    }

    

  const invoice = await prisma.invoice.findUnique({
    where: { 
        id: invoiceId , 
        userId: User.id

    },
  })

  if (!invoice) {
    throw new Error("Invoice not found")
  }

  const pdfBuffer = await generateInvoicePdf(invoice)

  return pdfBuffer
}
