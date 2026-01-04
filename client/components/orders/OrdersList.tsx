"use client";

import Image from "next/image";
import moment from "moment";

import { useGetOrders } from "@/hooks/api-hooks/useGetOrders";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const statusList: string[] = [
  "pending",
  "in_progress",
  "completed",
  "canceled",
];

const OrdersList = () => {
  const { data, isPending } = useGetOrders();

  return (
    <section>
      <h3 className="text-2xl font-semibold p-4 rounded-lg shadow-sm bg-card">
        Orders List
      </h3>

      {isPending ? (
        <Card className="w-full min-h-72 flex items-center justify-center mt-6">
          <div className="loading loading-spinner"></div>
        </Card>
      ) : (
        <Card className="mt-6 py-0">
          <Table className="w-full rounded-t-lg overflow-hidden">
            <TableCaption className="p-4">A list of your orders.</TableCaption>
            <TableHeader className="bg-muted rounded-lg">
              <TableRow>
                <TableHead className="w-[25px]">#</TableHead>
                <TableHead className="w-[200px]">Product</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Total Price</TableHead>
                <TableHead className="text-center">Customer name</TableHead>
                <TableHead className="text-center">Due Date</TableHead>
                <TableHead className="text-center">Creator</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((order: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex flex-row items-center gap-2">
                      <Image
                        src={JSON.parse(order.product.images)[0]}
                        className="w-12 h-12 aspect-square rounded-md"
                        alt={order.product.name}
                        width={400}
                        height={400}
                      />
                      <div className="font-semibold">{order.product.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {order.quantity}
                  </TableCell>
                  <TableCell className="text-center">{order.price}</TableCell>
                  <TableCell className="text-center">
                    {order.customerName}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.dueDate
                      ? moment(order.dueDate).format("YYYY/MM/DD")
                      : ""}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.createdBy.name}
                  </TableCell>
                  <TableCell
                    className={`text-center ${
                      order.status === "pending" && "text-secondary"
                    } ${order.status === "completed" && "text-success"}
                      ${order.status === "canceled" && "text-error"}
                      ${order.status === "in_progress" && "text-primary"}`}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger className="cursor-pointer">
                        {order.status === "pending"
                          ? order.status + "..."
                          : order.status}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {statusList.map((status: string, index: number) => (
                          <DropdownMenuItem key={index}>
                            {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-center">
                    {order.notes?.length > 13
                      ? order.notes?.slice(0, 13) + "..."
                      : order.notes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </section>
  );
};

export default OrdersList;
