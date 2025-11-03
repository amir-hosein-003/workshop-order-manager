"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
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
import { SignupFormFields, signupSchema } from "@/lib/validations/signupSchema";
import PasswordInput from "@/components/ui/PasswordInput";
import { useSignUp } from "@/hooks/useSignUp";

const SignUp = () => {
  const form = useForm<SignupFormFields>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const mutation = useSignUp();

  const onSubmit = (data: SignupFormFields) => {
    console.log(data);
    mutation.mutate(data);
  };
  return (
    <section className="w-full md:h-screen bg-secondary flex flex-col items-center justify-center">
      <div className="p-6 bg-base-100 shadow-xl rounded-lg m-6">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <div className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Deo"
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
                <p className="">Have an existing account?</p>
                <Link
                  href="/auth/sign-in"
                  className="text-primary hover:underline"
                >
                  Sign In
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-primary-content rounded-full cursor-pointer"
                disabled={mutation.isPending}
              >
                {mutation.isPending && (
                  <div className="loading loading-spinner" />
                )}
                Sign Up
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
