"use client";
import { ReactNode } from "react";

const TypographyH1 = ({ children }: { children: ReactNode }) => {
  return (
    <h1
      contentEditable
      suppressContentEditableWarning
      spellCheck
      className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance outline-0"
    >
      {children}
    </h1>
  );
};

export default TypographyH1;
