"use client";
import ForgotPasswordForm from "@/app/components/common/forms/ForgotPasswordForm";
import { Card } from "@/app/components/shdcn/ui/card";
import { Alert } from "@/app/components/ui/Alert";
import { Logo } from "@/app/components/ui/Logo";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";

const ForgotPasswordPage = () => {
  const { error } = useAuth();

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="w-full space-y-6 max-w-lg p-6 bg-dark-gray border-gray-charcoal">
        <Logo size="lg" className="text-center mb-6" mode="light" />
        <p className="text-center">
          You can receive a renewal link by entering your email address.
        </p>
        {error && <Alert variant="danger">{error}</Alert>}
        <ForgotPasswordForm />
        <Link
          href="/login"
          className="text-xs text-blue-300 underline
          "
        >
          Do you know your password?
        </Link>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
