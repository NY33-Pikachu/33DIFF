import React, { useState, useEffect } from 'react';
import AceEditor from "react-ace";
import UserConsole from './UserConsole';
const axios = require('axios');
// possible languages
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";

//possible themes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-github";

import "ace-builds/src-noconflict/ext-language_tools";
import { constantOtherSymbol } from 'ace-builds/src-noconflict/mode-ruby';



const Qotd = props => {
  // const [solution, setSolution] = useState(props.langSnippets[6]);
  // console.log(solution)
  const [theme, setTheme] = useState('twilight');
  const [lang, setLang] = useState('javascript')
  const changeTheme = (e) => {
    setTheme(e.target.textContent);
  };

  // const changeLang = (e) => {
  //   console.log(e.target.textContent)
  //   if(e.target.textContent === 'typescript') {
  //     props.setSolution(props.langSnippets[14])
  //     setLang(e.target.textContent)
  //   } else if(e.target.textContent === 'javascript') {
  //     props.setSolution(props.langSnippets[6])
  //     setLang(e.target.textContent)
  //   }
  // };

  const handleChange = (e) => {
    props.setSolution(e);
  };

  const handleSubmit = () => {
    alert(props.solution);
  };

  const execute = async () => {
    // Get input from the code editor
    // Run the user code
    const test = await new Function(props.solution)();
    
    await console.log(test);

  }


  return (
    <div id="qotd">
      <div id="prompt">
        <h1 id="question">QOTD: {props.title ? props.title : 'Loading...'}</h1>
        <div className="problem">
          <p>Difficulty: {props.difficulty}</p>
          <p id="problem" dangerouslySetInnerHTML={{__html: props.problem}}></p>
        </div>
      </div>
      <div id="userInput">
        <h1>Input Your Solution</h1>
        <div className="themeBtns">
          <button onClick={changeTheme}>twilight</button>
          <button onClick={changeTheme}>monokai</button>
          <button onClick={changeTheme}>terminal</button>
          <button onClick={changeTheme}>tomorrow</button>
          <button onClick={changeTheme}>github</button>
          <button onClick={changeTheme}>xcode</button>
        </div>
        {/* <div className="themeBtns">
          <button onClick={changeLang}>javascript</button>
          <button onClick={changeLang}>typescript</button>
        </div> */}
        <AceEditor
          className="testtest"
          placeholder="Type your solution here..."
          mode={lang}
          theme={theme}
          fontSize={14}
          // height="50vh"
          // width="40vw"
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={props.solution}
          onChange={handleChange}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
          }} />
        <button id="submit" onClick={execute}>Submit Solution</button>
        <div className="console">
          <UserConsole logs={props.consoleData} variant="dark" />
        </div>
      </div>
    </div>
  )
}

export default Qotd;