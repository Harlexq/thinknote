import LoginForm from "@/app/components/common/forms/LoginForm";
import OAuthButtons from "@/app/components/common/OAuthButtons";
import { Logo } from "@/app/components/ui/Logo";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-lg bg-dark-gray p-6 space-y-4 border border-gray-charcoal rounded-lg shadow-sm">
        <Logo size="lg" className="text-center" />
        <LoginForm />
        <p className="text-white-alpha text-center">Or</p>
        <OAuthButtons />
      </div>
    </div>
  );
};

export default LoginPage;
