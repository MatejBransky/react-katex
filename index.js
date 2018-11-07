import React, { memo } from 'react';
import PropTypes from 'prop-types';
import KaTeX from 'katex';

class TeX extends React.Component {
  constructor(props) {
    super(props);
    this.verifiedContent = ' ';
  }

  render() {
    let html, error;
    const props = this.props;
    const verifiedContent = this.verifiedContent;
    const otherProps = omit(
      [
        'children',
        'math',
        'block',
        'errorColor',
        'renderError',
        'suppressError'
      ],
      props
    );
    const content = props.children || props.math;
    const Component = props.block ? 'div' : 'span';
    const settings = {
      displayMode: !!props.block,
      errorColor: props.errorColor,
      throwOnError: !!props.renderError || props.suppressError
    };

    try {
      html = KaTeX.renderToString(content, settings);
      this.verifiedContent = content;
    } catch (err) {
      if (props.suppressError) {
        html = KaTeX.renderToString(verifiedContent, settings);
      } else {
        if (err instanceof KaTeX.ParseError || err instanceof TypeError) {
          error = err;
        }
      }

      throw err;
    }

    if (!html && !error) return null;

    return html ? (
      <Component {...otherProps} dangerouslySetInnerHTML={{ __html: html }} />
    ) : props.renderError ? (
      props.renderError(error)
    ) : (
      <Component
        {...otherProps}
        dangerouslySetInnerHTML={{ __html: error.message }}
      />
    );
  }
}

TeX.propTypes = {
  children: PropTypes.string,
  math: PropTypes.string,
  block: PropTypes.bool,
  errorColor: PropTypes.string,
  renderError: PropTypes.func,
  suppressError: PropTypes.bool
};

export default memo(TeX);

function omit(keys, obj) {
  return Object.keys(obj).reduce(
    (acc, key) => (keys.includes(key) ? acc : ((acc[key] = obj[key]), acc)),
    {}
  );
}
