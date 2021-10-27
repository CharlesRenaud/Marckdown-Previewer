import logo from './logo.svg';
import marked from 'marked'
import react,{useState, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "./prism.css"

import prismjs from 'prismjs';


const renderer = new marked.Renderer();

  marked.setOptions({
    breaks: true,
    highlight: function(code, lang) {
      try {
        return prismjs.highlightAll(code, prismjs.languages[lang], lang);
      } catch {
        return code;
      }
    }
  });



function App() {
  
  
  const [editorMaximized, setEditorMaximized] = useState(false)
  const [previewMaximized, setPreviewMaximized] = useState(false)

  const [markdown, setMardown] = useState(`# Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\` javascript
  marked.setOptions({
    highlight: function(code, lang) {
      try {
        return prismjs.highlight(code, prismjs.languages[lang], lang);
      } catch {
        return code;
      }
    }
  });
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
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
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  `)

  const classes = editorMaximized
  ? ['editorWrap maximized', 'previewWrap hide', 'fa fa-compress']
  : previewMaximized
  ? ['editorWrap hide', 'previewWrap maximized', 'fa fa-compress']
  : ['editorWrap', 'previewWrap', 'fa fa-arrows-alt'];
  setTimeout(() => prismjs.highlightAll(), 0)

  let props = {
    editorMaximized : editorMaximized,
    setEditorMaximized: setEditorMaximized,
    previewMaximized: previewMaximized,
    setPreviewMaximized:setPreviewMaximized,
    markdown: markdown,
    setMardown: setMardown
  }

const HandleEditorMaximize = () => {
  if(editorMaximized === false){
    setEditorMaximized(true)

  }else{
    setEditorMaximized(false)
  }
}


const HandlePreviewMaximize = () =>{
  if(previewMaximized === false){
    setPreviewMaximized(true)

  }else{
    setPreviewMaximized(false)
  }
}
  return (
    <div>
      <div className={classes[0]}>
        <Toolbar
          icon={classes[2]}
          onClick={() => HandleEditorMaximize()}
          text="Editor"
          {...props}
        />
        <Editor {...props} onChange={(e)=>setMardown(e.target.value)} />
      </div>
      <div className="converter" />
      <div className={classes[1]}>
        <Toolbar
          icon={classes[2]}
          onClick={() => HandlePreviewMaximize()}
          text="Previewer"
          {...props}
        />
        <Preview {...props}  />
      </div>
    </div>
  );
}

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      <i className="fa fa-free-code-camp" title="no-stack-dub-sack" />
      {props.text}
      <i className={props.icon} onClick={props.onClick} >FS</i>
    </div>
  );
};

const Editor = (props) => {
  return (
    <textarea
      id="editor"
      onChange={props.onChange}
      type="text"
      value={props.markdown}
    />
  );
};

const Preview = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer })
      }}
      id="preview"
    />
  );
};

export default App;
