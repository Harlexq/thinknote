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
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "@/app/hooks/useAuth";
import {
  ForgotPasswordSchema,
  forgotPasswordSchema,
} from "@/app/schema/forgotPasswordSchema";

const ForgotPasswordForm = () => {
  const { loading, forgotPassword } = useAuth();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = async (data: ForgotPasswordSchema) => {
    await forgotPassword(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleForgotPassword)}
        className="space-y-6"
      >
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
        <Button disabled={loading} type="submit" size="lg" className="w-full">
          {loading ? (
            <>
              Password reset link being sent...
              <Loader2 size={20} className="animate-spin" />
            </>
          ) : (
            <>
              Send Password Reset Link
              <ChevronRight size={20} />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
