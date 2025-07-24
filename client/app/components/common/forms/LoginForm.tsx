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
import { ChevronRight } from "lucide-react";
import PasswordInput from "../../ui/PasswordInput";

const LoginForm = () => {
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = () => {};

  return (
    <Form {...loginForm}>
      <form onSubmit={handleLogin} className="space-y-6">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="Please enter your e-mail address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Please enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button variant="ghost" size="lg">
            Login
            <ChevronRight size={18} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
