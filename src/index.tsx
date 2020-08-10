import React, {
  ComponentPropsWithoutRef,
  useState,
  useEffect,
  ReactElement,
  ElementType,
  memo,
} from 'react';
import KaTeX, { ParseError, KatexOptions } from 'katex';

const TeX: React.FC<TeXProps> = ({
  children,
  math,
  block,
  errorColor,
  renderError,
  settings,
  as: asComponent,
  ...props
}) => {
  const Component = asComponent || (block ? 'div' : 'span');
  const content = (children ?? math) as string;
  const [state, setState] = useState<
    { innerHtml: string } | { errorElement: React.ReactElement }
  >({ innerHtml: '' });

  useEffect(() => {
    try {
      const innerHtml = KaTeX.renderToString(content, {
        displayMode: !!block,
        errorColor,
        throwOnError: !!renderError,
        ...settings,
      });

      setState({ innerHtml });
    } catch (error) {
      if (error instanceof KaTeX.ParseError || error instanceof TypeError) {
        if (renderError) {
          setState({ errorElement: renderError(error) });
        } else {
          setState({ innerHtml: error.message });
        }
      } else {
        throw error;
      }
    }
  }, [block, content, errorColor, renderError, settings]);

  if ('errorElement' in state) {
    return state.errorElement;
  }

  return (
    <Component
      {...props}
      dangerouslySetInnerHTML={{ __html: state.innerHtml }}
    />
  );
};

export default memo(TeX);

type TeXProps = ComponentPropsWithoutRef<'div'> &
  Partial<{
    as: ElementType;
    math: string | number;
    block: boolean;
    errorColor: string;
    renderError: (error: ParseError | TypeError) => ReactElement;
    settings: KatexOptions;
  }>;
