import puppeteer from "puppeteer"
import { invoiceHtmlTemplate } from "../templates/templates"
import { Invoice } from "@/lib/generated/prisma"

export async function generateInvoicePdf(invoice: Invoice) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const html = invoiceHtmlTemplate(invoice)

  await page.setContent(html, {
    waitUntil: "networkidle0",
  })

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  })

  await browser.close()

  return pdfBuffer
}
