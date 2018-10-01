import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import marked from 'marked';
// import { Grid, Row, Col } from 'react-bootstrap';

let initialInputStr = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: initialInputStr
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }
  render() {
    return (
      <div className="App" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div id='editor-title' style={{margin: 'auto'}}><span style={{fontSize: '1rem'}}>Editor</span></div>
        <textarea id='editor' value={this.state.input} onChange={this.handleChange} />
        <div className='spacer'></div>
        <div id='preview-title' style={{margin: 'auto'}}><span style={{fontSize: '1rem'}}>Preview</span></div>
        <Marked value={this.state.input} />
      </div>
    );
  }
}

// takes string with marked text as input and returns corresponding html markup for use with dangerouslySetInnerHTML React attribute
function createMarkup(str) {
  // Create reference instance
  let myMarked = require('marked');

  // Set options
  // xhtml: closes all tags with /
  // breaks: substitutes linebreaks for <br />
  myMarked.setOptions({
    renderer: new myMarked.Renderer(),
    xhtml: true,
    breaks: true
  });
  let parsedHtml = myMarked(str);
  let parsedHtmlTargetBlank = addTargetBlank(parsedHtml);
  console.log(parsedHtmlTargetBlank);

  return { __html: parsedHtmlTargetBlank };
}

// takes parsed html from marked and replaces any "href='...'" by "href='...' target='_blank'"
let addTargetBlank = function (code) {
  return code.replace(/(href=".+?")/ig, `$1 target="_blank"`);
}

class Marked extends Component {
  render() {
    return (
      <div id='preview' dangerouslySetInnerHTML={createMarkup(this.props.value)} />
    );
  }
};

export default App;
