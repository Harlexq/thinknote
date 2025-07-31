import { ReactNode } from "react";

const TypographyP = ({ children }: { children: ReactNode }) => {
  return (
    <p
      contentEditable
      suppressContentEditableWarning
      spellCheck
      className="leading-7 outline-0"
    >
      {children}
    </p>
  );
};

export default TypographyP;
