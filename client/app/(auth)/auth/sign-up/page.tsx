"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

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
import { useSignUp } from "@/hooks/api-hooks/useSignUp";

const SignUp = () => {
  const mutation = useSignUp();

  const form = useForm<SignupFormFields>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupFormFields) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    }
    mutation.mutate(userData);
  };
  return (
    <section className="w-full h-screen bg-base-100">
      <div className="w-full h-full grid grid-cols-2 items-center">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src="/images/sign-up2.png"
            alt="sign-in"
            width={550}
            height={600}
          />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <div className="mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="min-w-md space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="absolute -top-4 left-3 bg-base-100 rounded-sm p-2">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Deo"
                          className="w-full h-12 rounded-lg text-base-content placeholder:text-base-content/40 border-2"
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
                    <FormItem className="relative">
                      <FormLabel className="absolute -top-4 left-3 bg-base-100 rounded-sm p-2">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@gmail.com"
                          className="w-full h-12 rounded-lg text-base-content placeholder:text-base-content/40 border-2"
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
                    <FormItem className="relative">
                      <FormLabel className="absolute -top-4 left-3 bg-base-100 rounded-sm p-2 z-10">
                        Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput field={field} placeholder="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="absolute -top-4 left-3 bg-base-100 rounded-sm p-2 z-10">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput field={field} placeholder="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {mutation.isError && (
                  <p className="text-sm text-error">
                    {mutation.error.message ===
                      "Request failed with status code 400" &&
                      "Invalid credentials"}
                  </p>
                )}

                {mutation.isSuccess && (
                  <p className="text-sm text-success">
                    Create account successfully
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-block rounded-lg mt-4"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending && (
                    <div className="loading loading-spinner" />
                  )}
                  Sign Up
                </button>

                <div className="flex flex-row items-center justify-center gap-2 text-sm">
                  <p className="">Have an existing account?</p>
                  <Link
                    href="/auth/sign-in"
                    className="text-blue-600 text-lg hover:underline"
                  >
                    Sign In
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
