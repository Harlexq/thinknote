import { ReactNode } from "react";

const TypographyH4 = ({ children }: { children: ReactNode }) => {
  return (
    <h4
      contentEditable
      suppressContentEditableWarning
      spellCheck
      className="scroll-m-20 text-xl font-semibold tracking-tight outline-0"
    >
      {children}
    </h4>
  );
};

export default TypographyH4;
