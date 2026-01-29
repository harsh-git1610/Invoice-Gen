// app/actions/ai.ts
'use server';
import { model } from "@/lib/ai/client";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/utils/db";

export async function askAI(message: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 1. DATA FETCHING (Smart Context)
  const [invoiceCount, recentInvoices, paidStats, pendingStats] = await Promise.all([
    // Count
    prisma.invoice.count({
      where: { user: { clerkId: userId } },
    }),
    // Recent 5
    prisma.invoice.findMany({
      where: { user: { clerkId: userId } },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { invoiceNumber: true, toName: true, total: true, status: true, date: true }
    }),
    // Total Paid
    prisma.invoice.aggregate({
      where: { user: { clerkId: userId }, status: "PAID" },
      _sum: { total: true }
    }),
    // Total Pending
    prisma.invoice.aggregate({
      where: { user: { clerkId: userId }, status: "PENDING" },
      _sum: { total: true }
    })
  ]);

  // 2. CONTEXT CONSTRUCTION
  const totalPaid = paidStats._sum.total || 0;
  const totalPending = pendingStats._sum.total || 0;

  const contextData = `
    User Financial Context:
    - Total Invoices Generated: ${invoiceCount}
    - Total Revenue Collected (PAID): ${totalPaid.toFixed(2)}
    - Pending Payments (Outstanding): ${totalPending.toFixed(2)}
    
    Recent Invoices (Last 5):
    ${recentInvoices.map(inv =>
    `- #${inv.invoiceNumber} to ${inv.toName}: ${inv.total} (${inv.status}) on ${inv.date.toISOString().split('T')[0]}`
  ).join("\n")}
  `;

  // 3. PROMPT COMPOSITION
  // Combine System Prompt + Context + User Question
  const finalPrompt = `
    ${SYSTEM_PROMPT}

    ${contextData}

    User Question: ${message}
  `;

  // 4. GENERATION
  const result = await model.generateContent(finalPrompt);
  return result.response.text();
}