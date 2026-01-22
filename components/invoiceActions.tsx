import { CheckCircle, CheckCircle2, DownloadCloudIcon, Mail, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";

interface InvoiceActionsProps {
    invoiceId: string;
}

export default function InvoiceActions({ invoiceId }: InvoiceActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href="">
                        <Pencil />Edit Invoice
                    </Link>

                </DropdownMenuItem>



                <DropdownMenuItem asChild>
                    <Link href={`/api/invoices/${invoiceId}/pdf`} target="_blank">
                        <DownloadCloudIcon />Download
                    </Link>

                </DropdownMenuItem>



                <DropdownMenuItem asChild>
                    <Link href="">
                        <Mail />Send Reminder
                    </Link>

                </DropdownMenuItem>



                <DropdownMenuItem asChild>
                    <Link href="">
                        <Trash />Delete Invoice
                    </Link>

                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href="">
                        <CheckCircle /> Mark as Paid
                    </Link>

                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}