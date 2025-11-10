"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
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
import { SigninFormFields, signinSchema } from "@/lib/validations/signinSchema";
import PasswordInput from "@/components/ui/PasswordInput";
import { useSignIn } from "@/hooks/api-hooks/useSignIn";

const SigninPage = () => {
  const mutation = useSignIn();
  const form = useForm<SigninFormFields>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SigninFormFields) => {
    mutation.mutate(data);
  };
  return (
    <section className="w-full h-screen bg-base-100">
      <div className="w-full h-full grid grid-cols-2 items-center">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-base-content/60 my-4">
            Login to access your account.
          </p>
          <div className="mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="min-w-md space-y-6"
              >
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

                {mutation.isError && (
                  <p className="text-sm text-error">
                    {mutation.error.message ===
                      "Request failed with status code 400" &&
                      "Invalid credentials"}
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
                  Sign In
                </button>

                <div className="flex flex-row items-center justify-center gap-2 text-sm">
                  <p className="">Don’t have an account?</p>
                  <Link
                    href="/auth/sign-up"
                    className="text-blue-600 text-lg hover:underline"
                  >
                    Sign Up
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src="/images/sign-in.png"
            alt="sign-in"
            width={500}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
