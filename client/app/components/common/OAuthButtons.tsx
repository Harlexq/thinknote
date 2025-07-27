"use client";

import OAuthButton from "../ui/OAuthButton";

const providers = [
  { id: "google", name: "Google", icon: "/icons/google.png" },
  { id: "microsoft", name: "Microsoft", icon: "/icons/microsoft.png" },
] as const;

const OAuthButtons = () => {
  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <OAuthButton
          key={provider.id}
          provider={provider}
          onClick={() => console.log("s")}
        />
      ))}
    </div>
  );
};

export default OAuthButtons;
