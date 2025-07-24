"use client";
import OAuthButton from "../ui/OAuthButton";

const OAuthButtons = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <OAuthButton
        iconSrc="/icons/google.png"
        name="Google"
        onClick={() => console.log("google")}
      />
      <OAuthButton
        iconSrc="/icons/microsoft.png"
        name="Microsoft"
        onClick={() => console.log("microsoft")}
      />
    </div>
  );
};

export default OAuthButtons;
