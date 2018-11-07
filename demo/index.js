import React from 'react';
import ReactDOM from 'react-dom';

import TeX from '@matejmazur/react-katex';

const _ = String.raw;
const style = {
  maxWidth: '500px',
  padding: '2rem',
  paddingBottom: '3rem',
  margin: '0 auto',
  border: '1px solid gray'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: _`y = k \cdot x + c`
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ value });
  }

  render() {
    return (
      <div style={style}>
        <h1>Demo of react-katex</h1>

        <h2>Dynamic formula</h2>
        <input value={this.state.value} onChange={this.handleChange} />
        {/* You can pass styles or classNames */}
        <TeX
          block
          style={{ minHeight: '30px', textAlign: 'center', margin: '1rem 0' }}
        >
          {this.state.value}
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
  }
}

function renderError(error) {
  return (
    <p>
      <b>Custom</b> error message: {error.name}
    </p>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
