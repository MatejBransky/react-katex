import React, { memo } from 'react';
import PropTypes from 'prop-types';
import KaTeX from 'katex';

/**
 * @typedef {object} TeXProps
 * @prop {string} [children]
 * @prop {string} [math]
 * @prop {boolean} [inline]
 * @prop {string} [errorColor]
 * @prop {(error: TypeError|KaTeX.ParseError) => React.ReactElement} [renderError]
 *
 * Renders LaTeX math
 * @param {TeXProps} props
 * @return {React.ReactElement}
 */
function TeX(props) {
  const otherProps = omit(
    ['children', 'math', 'inline', 'errorColor', 'renderError'],
    props
  );
  const Component = props.inline ? 'span' : 'div';
  const content = props.children || props.math;

  try {
    const html = KaTeX.renderToString(content, {
      displayMode: !props.inline,
      errorColor: props.errorColor,
      throwOnError: !!props.renderError
    });

    return (
      <Component {...otherProps} dangerouslySetInnerHTML={{ __html: html }} />
    );
  } catch (error) {
    if (error instanceof KaTeX.ParseError || error instanceof TypeError) {
      return props.renderError ? (
        props.renderError(error)
      ) : (
        <Component
          {...otherProps}
          dangerouslySetInnerHTML={{ __html: error.message }}
        />
      );
    }

    throw error;
  }
}

TeX.propTypes = {
  children: PropTypes.string,
  math: PropTypes.string,
  inline: PropTypes.bool,
  errorColor: PropTypes.string,
  renderError: PropTypes.func
};

export default memo(TeX);

function omit(keys, obj) {
  return Object.keys(obj).reduce(
    (acc, key) => (keys.includes(key) ? acc : ((acc[key] = obj[key]), acc)),
    {}
  );
}
