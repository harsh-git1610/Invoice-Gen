import { NextResponse } from "next/server"
import { getOrCreateDbUser } from "@/app/utils/getDbusers"
import { auth } from "@clerk/nextjs/server"
import { generateInvoicePdf } from "@/app/dashboard/invoices/pdf/generatePdf"
import {prisma} from "@/app/utils/db"

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
        return new NextResponse("Unauthorized", { status: 401 })

    }
    const user = await getOrCreateDbUser(clerkId)
    if (!user) {
        return new NextResponse("User not found", { status: 404 })
    }

    const invoice  = await prisma.invoice.findFirst({
        where : {
            id : params.id,
            userId : user.id
        }
    })

    if(!invoice){
        return new NextResponse("Invoice not found", { status: 404 })
    }

    const pdfBuffer = await generateInvoicePdf(invoice)

    return new NextResponse(new Uint8Array(pdfBuffer), {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="invoice-${invoice.invoiceNumber}.pdf"`,
        },
    })



}