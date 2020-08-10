<div align="center">
<h1>
  react-katex
</h1>
<p>
  <img src="https://raw.githubusercontent.com/MatejMazur/react-katex/master/docs/react-katex-logo.png" /><br />
  Display math expressions with <a href="https://khan.github.io/KaTeX" target="_blank">KaTeX</a> and <a href="https://reactjs.org" target="_blank">React</a>.
</p>
<p>
  <img src="https://raw.githubusercontent.com/MatejMazur/react-katex/master/docs/example.gif" />
</p>
<p>
  <a href="https://codesandbox.io/s/github/MatejMazur/react-katex/tree/master/demo?fontsize=14&hidenavigation=1&module=%2Fsrc%2FExample.tsx" target="_blank">Examples</a>
</p>
<p>
  <i><small>(based on the <a href="https://github.com/talyssonoc/react-katex" target="_blank">https://github.com/talyssonoc/react-katex</a>)</small></i><br />
  <i><small>
    (the readme and the demo are "forked" from <a href="https://github.com/talyssonoc/react-katex" target="_blank">https://github.com/talyssonoc/react-katex</a>)
  </small></i>
</p>
</div>
<hr />

Comparison with `react-katex`: https://github.com/talyssonoc/react-katex/issues/49.

![npm type definitions](https://img.shields.io/npm/types/typescript)

## Installation

```sh
  $ npm install katex @matejmazur/react-katex
  # or
  $ yarn add katex @matejmazur/react-katex
```

## Usage

```jsx
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
```

### Inline math

Display math in the middle of the text.

```jsx
ReactDOM.render(
  <TeX math="\\int_0^\\infty x^2 dx" />,
  document.getElementById('math')
);

// or

ReactDOM.render(
  <TeX>\int_0^\infty x^2 dx</TeX>,
  document.getElementById('math')
);
```

It will be rendered like this:

![Inline math](https://raw.githubusercontent.com/MatejMazur/react-katex/master/docs/inline.png)

### Block math

Display math in a separated block, with larger font and symbols.

```jsx
ReactDOM.render(
  <TeX math="\\int_0^\\infty x^2 dx" block />,
  document.getElementById('math')
);

// or

ReactDOM.render(
  <TeX block>\int_0^\infty x^2 dx</TeX>,
  document.getElementById('math')
);
```

It will be rendered like this:

![Block math](https://raw.githubusercontent.com/MatejMazur/react-katex/master/docs/block.png)

**Note:**<br>
Don't forget to import KaTeX CSS file.

```jsx
import 'katex/dist/katex.min.css';
```

### Error handling

#### Default error message

By default the error rendering is handled by KaTeX. You can optionally pass `errorColor` (defaults to `#cc0000`) as a prop:

```jsx
ReactDOM.render(
  <TeX math={'\\int_0^\\infty x^2 dx \\inta'} errorColor={'#cc0000'} />,
  document.getElementById('math')
);
```

This will be rendered like so:

![KaTeX error](https://raw.githubusercontent.com/MatejMazur/react-katex/master/docs/error.png)

#### Custom error message

It's possible to handle parse errors using the prop `renderError`. This prop must be a function that receives the error object and returns what should be rendered when parsing fails:

```jsx
ReactDOM.render(
  <TeX
    math="\\int_{"
    renderError={(error) => {
      return <b>Fail: {error.name}</b>;
    }}
  />,
  document.getElementById('math')
);

// The code above will render '<b>Fail: ParseError</b>' because it's the value returned from `renderError`.
```

This will render `<b>Fail: ParseError</b>`:

![renderError](https://raw.githubusercontent.com/MatejMazur/react-katex/master/docs/rendererror.png)

#### Custom wrapper component

You can change the wrapper component (block math uses `div` and inline uses `span`) by whatever you want via `props.as` attribute.

```jsx
ReactDOM.render(
  <TeX
    math="y = x^2"
    as="figcaption"
  />,
  document.getElementById('math')
);
```

### Escaping expressions

In addition to using the `math` property, you can also quote as a child allowing the use of `{ }` in your expression.

```jsx
ReactDOM.render(
  <TeX>{'\\frac{\\text{m}}{\\text{s}^2}'}</TeX>,
  document.getElementById('math')
);
```

Or Multiline

```jsx
ReactDOM.render(
  <TeX>{`\\frac{\\text{m}}
{\\text{s}^2}`}</TeX>,
  document.getElementById('math')
);
```

However, it can be annoying to escape backslashes. This can be circumvented with the `String.raw` tag on a template literal when using ES6.

```jsx
ReactDOM.render(
  <TeX>{String.raw`\frac{\text{m}}{\text{s}^2}`}</TeX>,
  document.getElementById('math')
);
```

Backticks must be escaped with a backslash but would be passed to KaTeX as \\\`. A tag can be created to replace \\\` with \`

```jsx
const latex = (...a) => String.raw(...a).replace('\\`', '`');
ReactDOM.render(<TeX>{latex`\``}</TeX>, document.getElementById('math'));
```

You can even do variable substitution

```jsx
const top = 'm';
const bottom = 's';
ReactDOM.render(
  <TeX>{String.raw`\frac{\text{${top}}}{\text{${bottom}}^2}`}</TeX>,
  document.getElementById('math')
);
```

### Configuring KaTeX

You can change directly [all KaTeX options](https://katex.org/docs/options.html) via `props.settings`:

**Example of adding a custom macro:**

```jsx
ReactDOM.render(
  <TeX settings={{ macros: { '*': '\\cdot' } }}>y = k * x + c</TeX>
);
```

Result:

![macros](https://raw.githubusercontent.com/MatejMazur/react-katex/master/docs/macros.png)
