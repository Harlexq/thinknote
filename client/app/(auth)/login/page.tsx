"use client";
import LoginForm from "@/app/components/common/forms/LoginForm";
import OAuthButtons from "@/app/components/common/OAuthButtons";
import { Card } from "@/app/components/shdcn/ui/card";
import { Alert } from "@/app/components/ui/Alert";
import Divider from "@/app/components/ui/Divider";
import { Logo } from "@/app/components/ui/Logo";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";

const LoginPage = () => {
  const { error } = useAuth();

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="w-full space-y-6 max-w-lg p-6 bg-dark-gray border-gray-charcoal">
        <Logo size="lg" className="text-center mb-6" mode="light" />
        <p className="text-center">
          You can continue to ThinkNote by logging in.
        </p>
        {error && <Alert variant="danger">{error}</Alert>}
        <LoginForm />
        <Divider text="or continue with" />
        <OAuthButtons />
        <Link
          href="/register"
          className="text-xs text-blue-300 underline
          "
        >
          Don{"'"}t have an account?
        </Link>
      </Card>
    </div>
  );
};

export default LoginPage;
