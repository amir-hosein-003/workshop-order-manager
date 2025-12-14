"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CreateOrderFormFields,
  createOrderSchema,
} from "@/lib/validations/createOrderSchema";
import { useCreateOrder } from "@/hooks/api-hooks/useCreateOrder";

import Icon from "../ui/icon";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
  };
}

const CreateNewOrder = ({ product }: Props) => {
  const [dateOpen, setDateOpen] = useState(false);

  const mutation = useCreateOrder();

  const form = useForm<CreateOrderFormFields>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      quantity: 1,
      customerName: "",
      notes: "",
      dueDate: "",
      priority: "normal",
    },
  });

  const quantity = useWatch({
    control: form.control,
    name: "quantity",
  });
  const totalPrice = Number(product.price) * (quantity || 1);

  const onSubmit = (data: CreateOrderFormFields) => {
    mutation.mutate({
      productId: product.id,
      ...data,
      price: totalPrice.toString(),
    });
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      form.reset();
    }
  }, [mutation.isSuccess, form]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn btn-primary rounded-md">
          Create Order
          <Icon icon="mynaui:arrow-right" width="24" height="24" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new order for {product.name}</DialogTitle>
          <DialogDescription>
            Please fill in the order details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Price (readonly - derived) */}
            <FormItem className="relative">
              <FormLabel className="absolute -top-4.5 left-3 bg-base-100 rounded-sm p-2">
                Price
              </FormLabel>
              <Input readOnly value={totalPrice} className="main-input h-10" />
            </FormItem>

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-4.5 left-3 bg-base-100 rounded-sm p-2">
                    Quantity
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      className="main-input h-10"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Math.max(1, Number(e.target.value)))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Customer name */}
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-4.5 left-3 bg-base-100 rounded-sm p-2">
                    Customer Name
                  </FormLabel>
                  <FormControl>
                    <Input className="main-input h-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-4.5 left-3 bg-base-100 rounded-sm p-2">
                    Due date
                  </FormLabel>
                  <FormControl>
                    <Popover open={dateOpen} onOpenChange={setDateOpen}>
                      <PopoverTrigger asChild>
                        <div className="main-input h-10 flex items-center justify-between px-2">
                          {field.value
                            ? new Date(field.value).toLocaleDateString()
                            : "Select date"}
                          <ChevronDownIcon className="size-4 opacity-60" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(date?.toISOString());
                            setDateOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-4.5 left-3 bg-base-100 rounded-sm p-2">
                    Priority
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="main-input w-full">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Priority</SelectLabel>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-4.5 left-3 bg-base-100 rounded-sm p-2">
                    Note
                  </FormLabel>
                  <FormControl>
                    <Textarea className="main-input min-h-32" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="btn btn-primary btn-block rounded-lg"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create Order"}
            </button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewOrder;
