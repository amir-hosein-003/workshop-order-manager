"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninFormFields, signinSchema } from "@/lib/validations/signinSchema";
import PasswordInput from "@/components/ui/PasswordInput";

const SigninPage = () => {
  const form = useForm<SigninFormFields>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SigninFormFields) => {
    console.log(data);
  };
  return (
    <section className="w-full md:h-screen bg-secondary flex flex-col items-center justify-center">
      <div className="p-6 bg-base-100 shadow-xl rounded-lg m-6">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <div className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        className="w-86 h-12 rounded-full bg-secondary text-secondary-content border-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput field={field} placeholder="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row items-center gap-2 text-sm">
                <p className="">Don’t have an account?</p>
                <Link
                  href="/auth/sign-up"
                  className="text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-primary-content rounded-full cursor-pointer"
                // disabled={mutation.isPending}
              >
                {/* {mutation.isPending && (
                  <div className="loading loading-spinner" />
                )} */}
                Sign In
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
