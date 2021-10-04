import "../css/chat.css";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

function Chat({ userInfo, plannerInfo }) {
  const [USERNAME, setUserName] = useState(userInfo.userName || "");
  const [message, setMessage] = useState({
    userName: userInfo.userName || "",
    content: "",
  });
  const [chatMsg, setChatMsg] = useState([]);
  const [groupNum, setGroupNum] = useState(plannerInfo.group.groupId || 1);
  const [nowChatUsers, setNowChatUsers] = useState([]);
  const socketRef = useRef();
  const imgSrc =
    "https://media3.giphy.com/media/9rv3RJwRmXWkISOUQc/giphy.gif?cid=ecf05e479nfusr0h4m7inyn3k4xeszsk00zzcj0b7z55gxjx&rid=giphy.gif&ct=g";

  const messageInChat = (msg) => {
    chatMsg.push(msg);
    const copyArray = JSON.parse(JSON.stringify(chatMsg));
    setChatMsg(copyArray);
  };
  const sendMessage = (e) => {
    const { userName, content } = message;
    e.preventDefault();
    console.log("send");
    socketRef.current.emit("chat", { userName, content, groupNum });
    setMessage({ userName, content: "" });
  };

  const keyTestFun = (e) => {
    console.log("!@##@!##@!");
    console.log(message);
    setMessage({ ...message, [e.target.name]: e.target.value });
    socketRef.current.emit("nowchating-back", {
      userName: USERNAME,
      content: e.target.value,
    });
  };

  const renderChat = () => {
    return chatMsg.map((item, index) => (
      <li key={index}>
        {item.userName}: <span>{item.content}</span>
      </li>
    ));
  };
  const removeNowChatUser = () => {
    const INDEX = nowChatUsers.indexOf(USERNAME);
    nowChatUsers.splice(INDEX, 1);
    const copyArray = JSON.parse(JSON.stringify(nowChatUsers));
    setNowChatUsers(copyArray);
  };
  const renderNowChat = () => {
    if (nowChatUsers.length !== 0) {
      const string = nowChatUsers.join(",");
      return (
        <div>
          <img id="nowChat" src={imgSrc} />
          {`(${string})님이 입력중입니다`}
        </div>
      );
    }
  };
  useEffect(() => {
    socketRef.current = io("http://localhost:80");
    socketRef.current.emit("join rooms", { userName: USERNAME, groupNum });
    socketRef.current.on("broadcast", ({ userName, content }) => {
      console.log("broadcast");
      messageInChat({ userName, content });
      removeNowChatUser();
    });
    socketRef.current.on("welcome", ({ userName, content }) => {
      console.log("welcome");
      messageInChat({ userName, content });
    });

    socketRef.current.on("mymsg", ({ userName, content }) => {
      console.log("mymsg");
      messageInChat({ userName, content });
    });

    socketRef.current.on("userout", ({ userName, content }) => {
      console.log("userout");
      messageInChat({ userName, content });
    });
    socketRef.current.on("nowchating-front", ({ userName, content }) => {
      console.log("nowchating");
      if (nowChatUsers.includes(userName) === false) {
        nowChatUsers.push(userName);
        const coppyArray = JSON.parse(JSON.stringify(nowChatUsers));
        setNowChatUsers(coppyArray);
      }
      if (!content.length) {
        removeNowChatUser();
      }
    });
  }, []);

  return (
    <div id="chatContainer">
      채팅방
      <ul id="messages">{renderChat()}</ul>
      {renderNowChat()}
      <div className="input">
        <form id="form" action="" onSubmit={sendMessage}>
          <input
            id="input"
            autoComplete="off"
            value={message.content}
            name="content"
            onChange={keyTestFun}
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
