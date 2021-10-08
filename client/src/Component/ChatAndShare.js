import React, { useState, useEffect, useRef, Fragment, componentDidUpdate } from "react";
import io from 'socket.io-client'



function ChatAndShare({userInfo,plannerInfo}) {
    const [peerIce , setPeerIce] = useState(null);
    const [renderSwitch,setRenderSwitch]  = useState(false)
    const [myStream , setMyStream] = useState(null);
    const [myPeerConnection , setMyPeerConnection] = useState(new RTCPeerConnection({
        iceServers: [
            {
              urls: [
                "stun:stun.l.google.com:19302",
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
                "stun:stun3.l.google.com:19302",
                "stun:stun4.l.google.com:19302",
              ],
            },
          ]
    }));
    const [videoToggle, setVideoToggle] = useState(false);
    const [audioToggle, setAudioToggle] = useState(false);
    const [shareVideo, setShareVideo] = useState(false)
    const [USERNAME , setUserName] = useState(userInfo.userName || "")
    const [message, setMessage] = useState({
        userName: userInfo.userName || "",
        content: "",
      })
    const [chatMsg, setChatMsg] = useState([]);
    const [groupNum, setGroupNum] = useState(plannerInfo.group.groupId || 1)
    const [nowChatUsers, setNowChatUsers] = useState([]);
    const socketRef = useRef();
    const button = useRef();
    const myFace = useRef();
    const shareDisPlay = useRef();
    const imgSrc='https://media3.giphy.com/media/9rv3RJwRmXWkISOUQc/giphy.gif?cid=ecf05e479nfusr0h4m7inyn3k4xeszsk00zzcj0b7z55gxjx&rid=giphy.gif&ct=g'
    const messageInChat = (msg) => {
        chatMsg.push(msg)
        const copyArray = JSON.parse(JSON.stringify(chatMsg))
        setChatMsg(copyArray)
    }
    const sendMessage = (e) => {
        const {userName,content} = message
        e.preventDefault();
        console.log('send')
        //useRef시에만 current
        socketRef.current.emit('chat',{userName,content,groupNum})
        setMessage({userName,content:''})
        //저 nowChat array 0이 상대방한테 가야됨
    }

    
    const keyTestFun = (e) => {
        setMessage({...message,[e.target.name]:e.target.value})
        socketRef.current.emit('nowchating-back',{userName:USERNAME,content:e.target.value})
    }

	const renderChat = () => {
		return chatMsg.map((item, index) => (
			<li key={index}>
					{item.userName}: <span>{item.content}</span>
			</li>
		    )
        )
	}
    const removeNowChatUser= () => {
        const INDEX = nowChatUsers.indexOf(USERNAME)
        nowChatUsers.splice(INDEX,1)
        const copyArray = JSON.parse(JSON.stringify(nowChatUsers))
        setNowChatUsers(copyArray)
    }
    const renderNowChat = () => {
        if(nowChatUsers.length !== 0){
            const string = nowChatUsers.join(',')
            return <div><img id="nowChat" src={imgSrc}/>{`(${string})님이 입력중입니다`}</div>
        }
    }
    const getMedia = async(fun) => {
        console.log('first')
        const stream = await navigator.mediaDevices.getUserMedia({video:true, audio:true});
        setMyStream(stream)
        //myStream = stream
        myFace.current.srcObject = stream;
        stream.getAudioTracks()[0].enabled = false
        stream.getVideoTracks()[0].enabled = false

        makeConnection(stream,myPeerConnection)
    }

    const makeConnection = (stream,connection) =>  {
        console.log('second')
        connection.addEventListener('icecandidate',handleIce)
        connection.addEventListener('addstream',handleAddStream)
        connection.addEventListener('connectionstatechange',(event) => {
            console.log(`connection is ===> ${connection.connectionState}`)
        })
       //화면공유 스트림이던 내비디오 스트림이던 똑같구분필요없이 video로 날라옴
        stream.getTracks().forEach(track => myPeerConnection.addTrack(track,stream))
    } 

    const handleDisplay = async() => {
        if(shareVideo){//끌때
            const peerSenders = myPeerConnection.getSenders()
            const videoSender = peerSenders.find(sender => sender.track.kind === 'video');
            videoSender.track.enabled = false;
            const newTrack = myStream.getVideoTracks()[0]
            videoSender.replaceTrack(newTrack)
            socketRef.current.emit('shareDisplayOff',{groupNum})
            shareDisPlay.current.classList.remove('open')
            setShareVideo(false)
        }
        else{//공유켤때
            setShareVideo(true) 
            const displayStream = await navigator.mediaDevices.getDisplayMedia({video:true})
            shareDisPlay.current.srcObject = displayStream
            shareDisPlay.current.classList.toggle('open')
            socketRef.current.emit('shareDisplayOn',{groupNum})
            const videoSender = myPeerConnection.getSenders().find(sender => sender.track.kind === 'video');
            console.log(myPeerConnection.getSenders())
            const newTrack = displayStream.getVideoTracks()[0]
            videoSender.replaceTrack(newTrack)
            
        }
    }



    const handleIce = (data)  => {
        console.log('send ice candidate')
        setPeerIce(data)
        socketRef.current.emit('peer-ice',{ice:data.candidate,groupNum})
    }

    const handleAddStream= (data) => {
        console.log('receive add stream event from peer')
        if(data){
            const joinUserVideo = document.createElement('video')
            joinUserVideo.autoplay = true
            joinUserVideo.playsInline = true
            console.log('joinuser')
            joinUserVideo.srcObject =data.stream;
            shareDisPlay.current.srcObject = data.stream;
            document.getElementById('userVideo').appendChild(joinUserVideo)
        }
    }

    const handleVideo = () => {
        const videoInfo = myStream.getVideoTracks()[0]
        if(videoToggle){
            videoInfo.enabled = false
            setVideoToggle(false)
        }
        else {
            videoInfo.enabled = true
            setVideoToggle(true)
        }
    }

    const handleBackMap = () => {
        const mapWrap = document.getElementById('map_wrap')
        mapWrap.classList.remove('close')
        const streamContainer = document.getElementById('streamContainer')
        streamContainer.classList.add('close')
    }

    const handleAudio = () => {
        const audioInfo = myStream.getAudioTracks()[0]
        if(audioToggle){
            audioInfo.enabled = false
            setAudioToggle(false)
        }
        else {
            audioInfo.enabled = true
            setAudioToggle(true)
        }
    }

    const handleButton = () => {
        button.current.classList.toggle('open')
    }

    const handleOutButton = () => {
        button.current.classList.remove('open')
    }
    const socketIo = () => {
        console.log('third')
        socketRef.current =io(`${process.env.REACT_APP_API_URL || "http://localhost:80"}`)
        socketRef.current.emit('join rooms', {userName:USERNAME ,groupNum})
        socketRef.current.on('broadcast',({userName,content})=>{
            console.log('broadcast')
            messageInChat({userName:USERNAME,content})
            removeNowChatUser()
        })
        socketRef.current.on('welcome', async({userName,content,groupName})=>{
            console.log('somone login')
            const offer = await myPeerConnection.createOffer();
            myPeerConnection.setLocalDescription(offer) //Local(내꺼에set)
            console.log(myPeerConnection)
            socketRef.current.emit('peer-offer',{offer,groupName})
            console.log('local set -> send offer')
            messageInChat({userName,content})
        })

        socketRef.current.on('peer-offer',async({offer,groupName})=> {
            console.log('remote set -> receive offer -> send answer')
            myPeerConnection.setRemoteDescription(offer)
            const answer = await myPeerConnection.createAnswer();
            myPeerConnection.setLocalDescription(answer)
            console.log(myPeerConnection)

            socketRef.current.emit('peer-answer',{answer,groupName})
        })

        socketRef.current.on('peer-answer',({answer,groupName})=>{
            console.log('receive answer')
            myPeerConnection.setRemoteDescription(answer)
        })

        socketRef.current.on('peer-ice',({ice})=>{
            //받은 ice candidate를 set
            console.log('receive ice candidate')
            myPeerConnection.addIceCandidate(ice)
        })

        socketRef.current.on('shareDisplayOn',()=> {
            console.log('share-on')
            shareDisPlay.current.classList.toggle('open')
        })

        socketRef.current.on('shareDisplayOff',()=> {
            console.log('share-off')
            const videoSender = myPeerConnection.getSenders().find(sender => sender.track.kind === 'video');
            if(!videoSender.track.enabled){
                shareDisPlay.current.classList.remove('open')
                videoSender.replaceTrack(myStream.getVideoTracks()[0])
            }
        })

        socketRef.current.on('mymsg',({userName,content})=>{
            console.log('mymsg')
            messageInChat({userName,content})
        })

        socketRef.current.on('userout',({userName,content})=>{
            console.log('userout')
            messageInChat({userName,content})
        })
        socketRef.current.on('nowchating-front',({userName,content})=>{
            console.log('nowchating')
            if(nowChatUsers.includes(userName) === false){
                nowChatUsers.push(userName)
                const coppyArray = JSON.parse(JSON.stringify(nowChatUsers))
                setNowChatUsers(coppyArray)
            }
            if(!content.length){removeNowChatUser()}
        })
    }
    //2번씩 렌더되던데 왜그럴까..
    useEffect(() => {
        console.log('change')
        console.log(USERNAME)
        console.log(groupNum)
        if(myStream === null){
            getMedia()
            setRenderSwitch(true)
        }
        if(myStream  !== null && myPeerConnection!== null){
            if(renderSwitch===true){
                socketIo()
                setRenderSwitch(false) 
            }
        }
    }, [myStream])


    return (
        <div id="streamContainer">
            <div id="streamBox">
                <div id="camContainer">
                    <div id="myVideo">
                        <video ref={myFace} autoPlay playsInline onMouseEnter={handleButton} onMouseOut={handleOutButton}></video>
                        <div id="share_button" className="close" ref={button} onMouseEnter={handleButton}>
                            <button onClick={handleVideo}>{videoToggle ? 'Off Video' : 'On Video'}</button>
                            <button onClick={handleAudio}>{audioToggle ? 'Off Audio' : 'On Audio'}</button>
                            <button onClick={handleDisplay}>{shareVideo ? '화면공유Off':'화면공유'}</button>
                        </div>
                    </div>
                    <div id="userVideo"></div>
                </div>
                <div id="shareContainer">
                     <video id="shareVideo" className="close" ref={shareDisPlay} autoPlay playsInline></video>
                </div>
            </div>
            <div id="chatBox">
                <img onClick={handleBackMap} src="https://thumb.ac-illust.com/t/72/722187d96fe3733edb99ac2682c079ac_t.jpeg" id="backMap" />
                <span>Chat Room</span>
                <ul id="messages">
                    {renderChat()}
                </ul>
                {renderNowChat()}
                <form id="shareForm" action="" onSubmit={sendMessage}>
                    <input id="shareInput" autocomplete="close" value={message.content} name="content" onChange={keyTestFun} /><button id="shereButton">Send</button>
                </form>
            </div>
        </div>
    );
}

export default ChatAndShare;
