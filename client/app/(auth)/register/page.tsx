"use client";
import RegisterForm from "@/app/components/common/forms/RegisterForm";
import OAuthButtons from "@/app/components/common/OAuthButtons";
import { Card } from "@/app/components/shdcn/ui/card";
import { Alert } from "@/app/components/ui/Alert";
import Divider from "@/app/components/ui/Divider";
import { Logo } from "@/app/components/ui/Logo";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";

const RegisterPage = () => {
  const { error } = useAuth();

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="w-full space-y-6 max-w-xl p-6 bg-dark-gray border-gray-charcoal">
        <Logo size="lg" className="text-center mb-6" mode="light" />
        <p className="text-center">
          You can continue to ThinkNote by registering.
        </p>
        {error && <Alert variant="danger">{error}</Alert>}
        <RegisterForm />
        <Divider text="or continue with" />
        <OAuthButtons />
        <Link
          href="/login"
          className="text-xs text-blue-300 underline
          "
        >
          Do you have an account?
        </Link>
      </Card>
    </div>
  );
};

export default RegisterPage;
