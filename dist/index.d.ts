import React, { ComponentPropsWithoutRef } from 'react';
import KaTeX, { ParseError } from 'katex';
declare const TeX: React.FC<TeXProps>;
export default TeX;
declare type TeXProps = ComponentPropsWithoutRef<'div'> & Partial<{
    math: string | number;
    block: boolean;
    errorColor: string;
    renderError: (error: ParseError | TypeError) => React.ReactElement;
    settings: KaTeX.KatexOptions;
}>;
