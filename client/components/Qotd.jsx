import React, { useState, useEffect } from 'react';
import AceEditor from "react-ace";
import { Console, Hook, Unhook } from 'console-feed'
import axios from 'axios';
import UserConsole from './UserConsole';
import SubmitForm from './SubmitForm';
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
  const [theme, setTheme] = useState('twilight');
  const [lang, setLang] = useState('javascript');
  const [problem, setProblem] = useState('');
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [solution, setSolution] = useState('');
  const [toggleForm, setToggleForm] = useState(false);
  const [name, setName] = useState(undefined)

  const snipSnips = {
    cpp: 0,
    java: 1,
    python: 2,
    csharp: 5,
    javascript: 6,
  };
  const [langSnippets, setLangSnippets] = useState('')
  
  const getQuestion = async () => {
    const day1 = new Date('07/10/2022');
    const day2 = new Date();
    const difference = day1.getTime() - day2.getTime();
    const days = Math.abs(Math.ceil(difference / (1000 * 3600 * 24)));
    // console.log('day', days);
    const qData = await axios.get(`/api/qotd/${days}`);
    // console.log(qData);
    console.log('Welcome! Hit run code to see it display here!');
    setProblem(qData.data.question.content);
    setLangSnippets(qData.data.question.codeSnippets);
    setSolution(qData.data.question.codeSnippets[6].code);
    setTitle(qData.data.question.title);
    setDifficulty(qData.data.question.difficulty);
  };
  
  useEffect(() => {
    getQuestion();
  }, []);


  const changeTheme = (e) => {
    setTheme(e.target.value);
  };

  const changeLanguage = (e) => {
    setSolution(langSnippets[snipSnips[e.target.value]].code)
    setLang(e.target.value);
  };

  const handleChange = (e) => {
    setSolution(e);
  };

  // display a form for the user to
  // input their name (first)
  const displayForm = () => {
    toggleForm ? setToggleForm(false) : setToggleForm(true);
  }

  const handleSubmit = () => {
    const day1 = new Date('07/10/2022');
    const day2 = new Date();
    const difference = day1.getTime() - day2.getTime();
    const days = Math.abs(Math.ceil(difference / (1000 * 3600 * 24)));
    axios.post('/api/userData', {
      solution: `${solution}`,
      id: days,
      name: name
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err);
    });
    setToggleForm(false);
  };

  const execute = () => {
    // Get input from the code editor
    // Run the user code
    try {
      new Function(solution)();
    }
    catch(err) {
      console.log(err)
    };
  };


  return (
    <div id="qotd">
      <div id="prompt">
        <h1 id="question">QOTD: {title ? title : 'Loading...'}</h1>
        <div className="problem">
          <p>Difficulty: {difficulty}</p>
          <p id="problem" dangerouslySetInnerHTML={{__html: problem}}></p>
        </div>
      </div>
      <div id="userInput">
        <h1>Input Your Solution</h1>
        <div className="change-theme-container">
          <div className="themes">
            <label>Change Theme: </label>
            <select onChange={changeTheme} className="themeBtns">
              <option value="twilight">Twilight</option>
              <option value="monokai">Monokai</option>
              <option value="terminal">Terminal</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="github">Github</option>
              <option value="xcode">Xcode</option>
            </select>
          </div>
          <div className="languages">
            <label>Change Language: </label>
            <select onChange={changeLanguage} className="themeBtns">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="csharp">C#</option>
              <option value="java">Java</option>
            </select>
          </div>
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
          value={solution}
          onChange={handleChange}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
          }} />
        <div className="console">
          {/* <Console logs={logs} variant="dark" /> */}
          <UserConsole />
        </div>
        <div className="codeButtons">
         {lang === 'javascript' ? <button id="submit" onClick={execute}>Run Code</button> : <button id="submit">Run Code Disabled</button>}
          <button id="submit" onClick={displayForm}>Submit Solution</button>
        </div>
      </div>
      {toggleForm ? <SubmitForm name={name} setName={setName} handleSubmit={handleSubmit} setToggleForm={setToggleForm}/> : null}
    </div>
  );
};

export default Qotd;