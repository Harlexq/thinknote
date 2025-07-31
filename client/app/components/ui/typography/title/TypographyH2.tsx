import { ReactNode } from "react";

const TypographyH2 = ({ children }: { children: ReactNode }) => {
  return (
    <h2
      contentEditable
      suppressContentEditableWarning
      spellCheck
      className="scroll-m-20 text-3xl font-semibold tracking-tight outline-0"
    >
      {children}
    </h2>
  );
};

export default TypographyH2;
