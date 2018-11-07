import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

import TeX from '../index';

const _ = String.raw;
const style = {
  maxWidth: '500px',
  padding: '2rem',
  paddingBottom: '3rem',
  margin: '0 auto',
  border: '1px solid gray'
};

const App = () => {
  const [value, setValue] = useState(_`y = k \cdot x + c`);

  const handleChange = event => {
    setValue(event.target.value);
  };
  // TeX component is memoized so you can avoid rerendering
  const renderError = useCallback(
    err => (
      <p>
        <b>Custom</b> error message: {err.name}
      </p>
    ),
    []
  );

  return (
    <div style={style}>
      <h1>Demo of react-katex</h1>

      <h2>Dynamic formula</h2>
      <input value={value} onChange={handleChange} />
      {/* You can pass styles or classNames */}
      <TeX
        suppressError
        block
        style={{ minHeight: '30px', textAlign: 'center', margin: '1rem 0' }}
      >
        {value}
      </TeX>

      <h2>Inline math</h2>
      <p>
        This is an example of inline math (via <code>props.children</code>
        ): <TeX>\int_0^\infty x^2 dx</TeX>.<br />
        <i>
          (you must use curly braces if you want to use chars like &quot;
          {'{'}
          &quot;, &quot;
          {'}'}
          &quot;)
        </i>
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

ReactDOM.render(<App />, document.getElementById('root'));
