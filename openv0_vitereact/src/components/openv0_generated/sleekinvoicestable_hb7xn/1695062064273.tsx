import React from 'react'
import { ArrowDownZA, ArrowDown01, Shuffle, ArrowUp01, ArrowDownAZ, ArrowUpAZ, View, Eye } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data = [
  {
    "invoice": "INV001",
    "customer": "John Doe",
    "date": "05/07/2021",
    "total": "$100",
    "status": "Paid"
  },
  {
    "invoice": "INV002",
    "customer": "Emma Smith",
    "date": "10/07/2021",
    "total": "$500",
    "status": "Pending"
  },
  // add more data if needed
]

const SleekInvoicesTable = () => {
  return (
    <>
      <Table className="table-auto divide-y divide-light-blue-500 dark:divide-dark-blue-500">
        <TableCaption className = "text-lg font-medium p-3 dark:text-gray-200">Recent Invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="p-3">Invoice <ArrowDownZA className="h-4 w-4 inline" /></TableHead>
            <TableHead className="p-3">Customer</TableHead>
            <TableHead className="p-3">Date</TableHead>
            <TableHead className="p-3">Total</TableHead>
            <TableHead className="p-3">Status</TableHead>
            <TableHead className="p-3">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice, index) => (
            <TableRow key={index}>
              <Popover>
                <PopoverTrigger asChild>
                  <TableCell className="p-3 cursor-pointer hover:underline">{invoice.invoice}</TableCell>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-3 dark:bg-gray-700 dark:text-white">
                  <h4 className="font-medium leading-none">Invoice Details</h4>
                  <p className="mt-2">Customer: {invoice.customer}</p>
                  <p>Date: {invoice.date}</p>
                  <p>Total: {invoice.total}</p>
                </PopoverContent>
              </Popover>
              <TableCell className="p-3">{invoice.customer}</TableCell>
              <TableCell className="p-3">{invoice.date}</TableCell>
              <TableCell className="p-3">{invoice.total}</TableCell>
              <TableCell className="p-3">{invoice.status}</TableCell>
              <TableCell className="p-3">
                <Eye className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default SleekInvoicesTable