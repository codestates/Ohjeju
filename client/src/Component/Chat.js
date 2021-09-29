import "../css/chat.css";
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import test from "socket.io-client";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
// import test2 from 'socket.io'

function Chat() {
  const [chatMsg, setChatMsg] = useState([]);
  //userName부분 -> 프롭스로받아오는 유저정보에 이름넣으면 될거같다
  const [userName, setUserName] = useState("default");
  const [nowChat, setNowChat] = useState(false);
  const [nowChatUser, setNowChatUser] = useState("");
  const [groupNum, setGroupNum] = useState(1);
  //back-end단에서 짠 socket과 연결
  const socket = test("http://localhost:4000");
  const testFun = (e) => {
    //인제 이걸 유저별로 나눠야..
    //방도 나눠야.. ggasd
    let input = document.getElementById("input");
    e.preventDefault();
    setNowChat(false);
    socket.emit("chat", { name: userName, content: input.value, groupNum });
    input.value = "";
  };
  const keyTestFun = (e) => {
    if (e.target.value.length !== 0) {
      setNowChat(true);
      socket.emit("input", { name: userName });
    } else {
      setNowChat(false);
    }
  };
  //2번씩 렌더되던데 왜그럴까..
  useEffect(() => {
    //일단 그룹별입장을 해놧긴햇는데 확인을 어찌하냐;
    socket.emit("join rooms", groupNum);
    socket.on("broadcast", (msg) => {
      window.scrollTo(0, document.body.scrollHeight);
      chatMsg.push(msg);
      const result = JSON.parse(JSON.stringify(chatMsg));
      setChatMsg(result);
    });
    socket.on("keyping", (msg) => setNowChatUser(msg));
  }, []);

  return (
    <div id="chatContainer">
      채팅
      <div className="nowChat">
        {nowChat ? (
          <div>
            <img
              id="nowChat"
              src="https://media3.giphy.com/media/9rv3RJwRmXWkISOUQc/giphy.gif?cid=ecf05e479nfusr0h4m7inyn3k4xeszsk00zzcj0b7z55gxjx&rid=giphy.gif&ct=g"
            />
            {nowChatUser}
          </div>
        ) : null}
      </div>
      <ul id="messages">
        {chatMsg.length !== 0
          ? chatMsg.map((item) => (
              <li className="chat">
                <span className="chatName">{item.name} : </span>
                <span className="chatContent">{item.content}</span>
              </li>
            ))
          : null}
      </ul>
      <form id="form" action="" onSubmit={testFun}>
        <input id="input" autocomplete="off" onKeyUp={keyTestFun} />
        <button>Send</button>
      </form>
    </div>
  );
}

export default Chat;
