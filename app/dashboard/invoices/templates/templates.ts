import { Invoice } from "@/lib/generated/prisma"

export function invoiceHtmlTemplate(invoice: Invoice) {
  const items = invoice.items as any[];
  const currency = invoice.currency;
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : currency === "INR" ? "₹" : currency;

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const discountPercentage = invoice.discount || 0;
  const discountAmount = subtotal * (discountPercentage / 100);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxRate = invoice.taxRate || 0;
  const taxName = invoice.taxName || "Tax";
  const tax = taxableAmount * (taxRate / 100);
  const total = taxableAmount + tax;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Inter', sans-serif;
            padding: 60px;
            color: #000;
            max-width: 800px;
            margin: 0 auto;
            -webkit-font-smoothing: antialiased;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 60px;
          }

          .logo-area {
            font-weight: 700;
            font-size: 24px;
            letter-spacing: -0.5px;
          }

          .invoice-badge {
            font-size: 14px;
            font-weight: 600;
            background: #000;
            color: #fff;
            padding: 4px 12px;
            border-radius: 4px;
            display: inline-block;
          }

          .meta-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 60px;
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 40px;
          }

          .meta-item label {
            display: block;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.05em;
            color: #666;
            margin-bottom: 8px;
            font-weight: 500;
          }

          .meta-item p {
            margin: 0;
            font-size: 14px;
            font-weight: 500;
          }

          .addresses {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 60px;
          }

          .address-col label {
            display: block;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.05em;
            color: #666;
            margin-bottom: 12px;
            font-weight: 500;
          }

          .address-col strong {
            display: block;
            font-size: 15px;
            margin-bottom: 4px;
            font-weight: 600;
          }

          .address-col p {
            margin: 0;
            font-size: 14px;
            line-height: 1.6;
            color: #444;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
          }

          th {
            text-align: left;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.05em;
            color: #666;
            padding: 12px 0;
            border-bottom: 1px solid #eaeaea;
            font-weight: 500;
          }

          td {
            padding: 16px 0;
            border-bottom: 1px solid #eaeaea;
            font-size: 14px;
          }

          .text-right { text-align: right; }
          .text-center { text-align: center; }

          .summary-section {
            display: flex;
            justify-content: flex-end;
          }

          .summary-table {
            width: 300px;
            border-collapse: collapse;
          }

          .summary-row td {
            padding: 8px 0;
            border-bottom: none;
            color: #444;
          }

          .total-row td {
            padding-top: 16px;
            border-top: 1px solid #eaeaea;
            font-weight: 600;
            font-size: 16px;
            color: #000;
          }

          .footer {
            margin-top: 80px;
            padding-top: 20px;
            border-top: 1px solid #eaeaea;
            text-align: center;
            font-size: 13px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-area">
             ${invoice.companyLogo ? `<img src="${invoice.companyLogo}" style="height: 40px; width: auto;" />` : invoice.fromName}
          </div>
          <div class="invoice-badge">INVOICE</div>
        </div>

        <div class="meta-grid">
          <div class="meta-item">
            <label>Invoice No.</label>
            <p>${invoice.invoiceNumber}</p>
          </div>
          <div class="meta-item">
            <label>Issue Date</label>
            <p>${new Date(invoice.date).toLocaleDateString()}</p>
          </div>
          <div class="meta-item">
            <label>Due Date</label>
            <p>${new Date(invoice.dueDate).toLocaleDateString()}</p>
          </div>
          <div class="meta-item">
            <label>Status</label>
            <p>Due</p>
          </div>
        </div>

        <div class="addresses">
          <div class="address-col">
            <label>From</label>
            <strong>${invoice.fromName}</strong>
            <p>${invoice.fromEmail}</p>
            <p style="white-space: pre-wrap;">${invoice.fromAddress}</p>
          </div>
          <div class="address-col">
            <label>Bill To</label>
            <strong>${invoice.toName}</strong>
            <p>${invoice.toEmail}</p>
            <p style="white-space: pre-wrap;">${invoice.toAddress}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 50%">Description</th>
              <th class="text-center">Qty</th>
              <th class="text-right">Unit Price</th>
              <th class="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td class="text-center">${item.quantity}</td>
                <td class="text-right">${symbol}${Number(item.price).toFixed(2)}</td>
                <td class="text-right">${symbol}${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="summary-section">
          <table class="summary-table">
            <tr class="summary-row">
              <td>Subtotal</td>
              <td class="text-right">${symbol}${subtotal.toFixed(2)}</td>
            </tr>
            ${discountPercentage > 0 ? `
              <tr class="summary-row" style="color: #dc2626;">
                <td>Discount (${discountPercentage}%)</td>
                <td class="text-right">-${symbol}${discountAmount.toFixed(2)}</td>
              </tr>
            ` : ''}
            <tr class="summary-row">
              <td>${taxName} (${taxRate}%)</td>
              <td class="text-right">${symbol}${tax.toFixed(2)}</td>
            </tr>
            <tr class="summary-row total-row">
              <td>Total</td>
              <td class="text-right">${symbol}${total.toFixed(2)}</td>
            </tr>
          </table>
        </div>

        ${invoice.notes ? `
          <div style="margin-top: 60px;">
            <p style="font-size: 13px; color: #666; font-style: italic;">${invoice.notes}</p>
          </div>
        ` : ''}
        
        ${invoice.signature ? `
           <div style="margin-top: 40px; text-align: right;">
             <img src="${invoice.signature}" style="max-height: 80px; width: auto;" />
             <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #666; margin-top: 8px;">Authorized Signature</p>
           </div>
        ` : ''}

        <div class="footer">
          <p>Thank you for your business</p>
        </div>
      </body>
    </html>
  `
}
