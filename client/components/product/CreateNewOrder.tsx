"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

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

import { ChevronDownIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      price: product.price,
      quantity: 1,
      customerName: "",
      note: "",
      dueDate: "",
      priority: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-4.5 left-3 bg-base-100 rounded-sm p-2">
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input readOnly className="main-input h-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      onChange={(e) => {
                        const value = Math.max(1, Number(e.target.value));
                        field.onChange(value);

                        const sum = Number(product.price) * value;
                        form.setValue("price", sum.toString());
                      }}
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
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <div className="main-input h-10 flex items-center justify-between px-2">
                          {field.value
                            ? new Date(field.value).toLocaleDateString()
                            : "Select date"}
                          <ChevronDownIcon className="text-base-content/60 size-4" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            field.onChange(date?.toISOString());
                            setOpen(false);
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
                          <SelectLabel>priority</SelectLabel>
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

            {/* Note */}
            <FormField
              control={form.control}
              name="note"
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
              className="btn btn-primary btn-block rounded-lg mt-4"
            >
              Create Order
            </button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewOrder;
