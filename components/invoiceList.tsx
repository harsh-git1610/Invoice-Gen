import InvoiceActions from "./invoiceActions";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default function InvoiceList() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice Id</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>

                </TableRow>
                <TableRow>
                    <TableCell>INV-00001</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>$100</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>2025-12-01</TableCell>
                    <TableCell className="text-right">
                        <InvoiceActions invoiceId="INV-00001" />
                    </TableCell>
                </TableRow>
            </TableHeader>
        </Table>
    );
}