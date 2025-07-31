import { ReactNode } from "react";

const TypographyInlineCode = ({ children }: { children: ReactNode }) => {
  return (
    <code
      contentEditable
      suppressContentEditableWarning
      spellCheck
      className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold outline-0 caret-white"
    >
      {children}
    </code>
  );
};

export default TypographyInlineCode;
