import { ReactNode } from "react";

const TypographyH3 = ({ children }: { children: ReactNode }) => {
  return (
    <h3
      contentEditable
      suppressContentEditableWarning
      spellCheck
      className="scroll-m-20 text-2xl font-semibold tracking-tight outline-0"
    >
      {children}
    </h3>
  );
};

export default TypographyH3;
