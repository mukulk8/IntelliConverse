import "./App.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToOpenAI } from './openai';
import {useEffect, useRef, useState} from 'react';

function App() {
  const msgEnd=useRef(null);
  const [input, setInput]= useState("");
  const [messages, setMessages]=useState([
    {
       text: "Hi, ChatGPT is a language model developed by OpenAI. It is part of the GPT (Generative Pre-trained Transformer) series, which includes models like GPT-3. ChatGPT specifically focuses on generating human-like text in the context of conversational interactions.",
       isBot: true,
    }
  ]);
  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages]);
  const handleSend = async() => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
     const res = await sendMsgToOpenAI(text);
     setMessages([
      ...messages,
      {text, isBot: false},
      {text: res, isBot: true}
    ])
  }
  const handleEnter = async(e)=>{
    if(e.key==='Enter') await handleSend();
  }
  const handleQuery = async(e)=>{
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
     const res = await sendMsgToOpenAI(text);
     setMessages([
      ...messages,
      {text, isBot: false},
      {text: res, isBot: true}
    ])
  }
  return (
    <div className="App">
      <div className="sideBar">
        
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span></div>
            
            <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
            <div className="upperSideBottom">
              <button className="query" onClick={handleQuery} value={"What is ChatGPT ?"}>
                <img src={msgIcon} alt="Query" />What is ChatGPT ?</button>
              <button className="query" onClick={handleQuery} value={"How to use an API ?"}>
                <img src={msgIcon} alt="Query" />How to use an API ?</button>
            
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="Home" className="listItemsImg" />Home</div>
          <div className="listItems">
            <img src={saved} alt="Saved" className="listItemsImg" />Saved</div>
          <div className="listItems">
            <img src={rocket} alt="Upgrade" className="listItemsImg" /> Upgrade</div>
        </div>
      </div>
     
     
      <div className="main">
        <div className="chats">
           
           {messages.map((messages, i)=>
                <div key={i} className={messages.isBot? "chat bot" : "chat"}>
                <img className="chatImg"  src={messages.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{messages.text}</p>
               </div>
           )}
           <div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
             <input type="text" placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>CHatGPT may produce inaccurate information about people, places, or facts ChatGPT August 20 Version</p>
        </div>
      </div>
    </div>
  );
}

export default App;
