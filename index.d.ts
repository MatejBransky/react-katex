import { KatexOptions, ParseError } from 'katex';
import { FC, ReactNode, ElementType, CSSProperties } from 'react';

declare module '@matejmazur/react-katex' {
  export interface TeXProps {
    children: string;
    math: string;
    block: boolean;
    errorColor: string;
    renderError: (error: ParseError | TypeError) => ReactNode;
    settings: KatexOptions;
    as: ElementType;
    style: CSSProperties;
  }

  const TeX: FC<TeXProps>;

  export default TeX;
}