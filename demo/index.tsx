import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';

import TeX from '@matejmazur/react-katex';

import './style.css';
import { ParseError } from 'katex';

const _ = String.raw;

const Example = () => {
  const [value, setValue] = useState('y = k * x + c');
  const handleChange = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  return (
    <div className="app">
      <h1>Demo of react-katex</h1>

      <h2>Dynamic formula</h2>
      <textarea value={value} onChange={handleChange} spellCheck={false} />
      {/* You can pass styles or classNames */}
      <TeX
        block
        className="output"
        // you can change directly KaTeX options!
        settings={{ macros: { '*': _`\cdot` } }}
      >
        {value}
      </TeX>

      <small>
        You can notice that in the code is written the custom macro (via{' '}
        <code>props.settings</code>) for interpunct so you can use &quot;
        <code>*</code>
        &quot; instead of &quot;
        <code>\cdot</code>
        &quot;.
      </small>

      <h2>Inline math</h2>
      <p>
        This is an example of inline math (via <code>props.children</code>
        ): <TeX>\int_0^\infty x^2 dx</TeX>.<br />
      </p>
      <p>
        And the next one is written via <code>props.math</code>:{' '}
        <TeX math={_`\int_0^\infty x^2 dx`} />.
      </p>

      <h2>Block math</h2>

      <span>
        via <code>props.children</code>:
      </span>
      <TeX block>{_`
      \begin{pmatrix}
        1 & 0 & 0 \\
        0 & 1 & 0 \\
        0 & 0 & 1 \\
      \end{pmatrix}
      `}</TeX>

      <span>
        via <code>props.math</code>:
      </span>
      <TeX math={_`\int_0^\infty x^2 dx`} block />

      <h2>Error handling</h2>

      <span>
        <code>props.errorColor</code>:
      </span>
      <TeX errorColor="#cc0000" block>
        \int_0^\infty x^2 dx \inta
      </TeX>

      <span>
        <code>props.renderError</code>:
      </span>
      <TeX renderError={renderError} block>{_`\sum_{`}</TeX>

      <span>simple expression:</span>
      <TeX block>123 + 5 = 128</TeX>
    </div>
  );
};

function renderError(error: ParseError | TypeError) {
  return (
    <p>
      <b>Custom</b> error message: {error.name}
    </p>
  );
}

render(<Example />, document.getElementById('app'));
