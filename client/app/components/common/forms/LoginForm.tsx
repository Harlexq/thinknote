"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../shdcn/ui/form";
import { Input } from "../../shdcn/ui/input";
import { Button } from "../../shdcn/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import PasswordInput from "../../ui/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "@/app/schema/loginSchema";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { Checkbox } from "../../shdcn/ui/checkbox";

const LoginForm = () => {
  const { loading, login } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleLogin = async (data: LoginSchema) => {
    await login(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  type="email"
                  placeholder="Please enter your e-mail address"
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
                <PasswordInput
                  disabled={loading}
                  placeholder="Please enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Link
            href="/forgot-password"
            className="text-xs text-blue-300 underline
          "
          >
            Forgot your password?
          </Link>
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="inline-flex items-center gap-2">
                    <Checkbox
                      id="rememberMe"
                      disabled={loading}
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel htmlFor="rememberMe" className="cursor-pointer">
                      Remember Me
                    </FormLabel>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={loading} type="submit" size="lg" className="w-full">
          {loading ? (
            <>
              Logging in...
              <Loader2 size={20} className="animate-spin" />
            </>
          ) : (
            <>
              Sign in
              <ChevronRight size={20} />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
