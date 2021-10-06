import React, { useState, useEffect, useRef }from 'react';
import "../css/inviteGroup.css";

const axios = require('axios')

const InviteGroup = ({userInfo,plannerInfo}) => {
    console.log(`invite ${userInfo}`)
    // console.log(plannerInfo.group.user)
    const [emailInputValue,setEmailInputValue] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [findUser, setFindUser] = useState({
        id:'',
        image:'',
        userName:''
    })
    const [groupInfo , setGroupInfo] = useState(plannerInfo.group)

    const serverUrl = 'http://localhost:80'
    const getUserInfo = async(e) => {
        e.preventDefault();
        console.log('send to server')
        const getUser = await axios.get(`${serverUrl}/user/info?userEmail=${emailInputValue}`)
        const {id,userName,image} = getUser.data
        setUserEmail(emailInputValue)
        setFindUser({...findUser,id,userName,image})
        setEmailInputValue('')
    }

    const addToUser = () => {
        console.log('add')
        const groupId = plannerInfo.group.groupId
        axios.patch(`http://localhost:80/group?groupId=${groupId}`,{
            email:userEmail,
            action:'add'
        },{withCredentials: true})
        .then(item => {
            console.log('성공')
            const result  = JSON.parse(JSON.stringify(item.data))
            setGroupInfo(result)
            alert('추가되었습니다')
        })
        .catch(item => {
            console.log('catch')
            if(item.response.status === 409) alert('이미존재합니다')
        })
        //여기까지함 -> add하면 그룹묶고 이 그룹을 또 챗컴포넌트에 연결을 하든 하고 채팅방확인해야함
    }

    const inputEmail = (e) => {
        setEmailInputValue(e.target.value)
    }
    const removeUserInGroup = (targetUser) => {
        console.log('제거')
        if(userInfo.email === targetUser.email) alert('본인은 제거안됨')
        else{
            const groupId = plannerInfo.group.groupId
            axios.patch(`http://localhost:80/group?groupId=${groupId}`,{
                email:targetUser.email,
                action:'delete'
            },{withCredentials: true})
            .then(item => {
                console.log('제거성공')
                const result  = JSON.parse(JSON.stringify(item.data))
                setGroupInfo(result)
                alert('제거되었습니다')
            })
        }
    }

    const userSearch = (fun) => {
        if(findUser.id > 0){
            //서버랑 요청중에 톱니바퀴라던지 넣으면 더좋을듯
            return (
                <div>
                    <span>유저이름 : {findUser.userName}</span>
                    <span>유저이미지 : <img src={findUser.image} alt='' width='70' /></span>
                    <button onClick={fun}>Add</button>
                </div>
            )
        }
    }
    const mouseEnterUser = (idx) => {
        const getUserButton = document.getElementsByClassName(`user${idx}`)
        if(getUserButton[0] !== undefined) getUserButton[0].classList.toggle('open')
    }
    const mouseLeaveUser = (idx) => {
        const getUserButton = document.getElementsByClassName(`user${idx}`)
        if(getUserButton[0] !== undefined) getUserButton[0].classList.remove('open')
    }

    const chageLeader = (targetUser) => {
        console.log('change')
            const groupId = plannerInfo.group.groupId
            axios.patch(`http://localhost:80/group?groupId=${groupId}`,{
                email:targetUser.email,
                action:'change leader'
            },{withCredentials: true})
            .then(item => {
                console.log('변경성공')
                const result  = JSON.parse(JSON.stringify(item.data))
                setGroupInfo(result)
                alert('변경되었습니다')
            })
        }    

    const renderUser = (ele,remove,change) => {
        console.log('render')
        console.log(groupInfo)
        return ele.user.map((item,idx)=>{
            console.log('item')
            return (
            <li onMouseEnter={()=>{mouseEnterUser(idx)}}
                onMouseLeave={()=>{mouseLeaveUser(idx)}}
                //리더일때만 제거 수정버튼이나오고 리더가 아니면 안나와야됨 -> 리더한테는 제거/수정버튼 이나오면안됨
                className={item.id === groupInfo.leaderId ? 'leader' : null}>{item.userName}
            {(userInfo.id === groupInfo.leaderId) && (item.id !==groupInfo.leaderId) 
            ?
            <div className={item.id===groupInfo.leaderId ? null : `close user${idx}`}>
                <button onClick={()=>{remove(item)}}>제거</button>
                <button onClick={()=>{change(item)}}>리더변경</button>
            </div>
            : null}
            </li>
            )
        })
    }

    useEffect(() =>{
        console.log('useEffect')
        console.log('plannerInfo')
        console.log(plannerInfo)
        console.log('userInfo')
        console.log(userInfo)
        console.log(userInfo.id===groupInfo.leaderId)
        console.log('groupInfo')
        console.log(groupInfo)
    },[groupInfo])

    return (
        <div>
            <ul>그룹내 유저목록
                {/* {groupInfo.user.map((item,idx)=><li>{item.userName}<button onClick={()=>{removeUserInGroup(item)}}>제거</button></li>)} */}
                {renderUser(groupInfo,removeUserInGroup,chageLeader)}
            </ul>
            {/* 이 초대 form도 리더만 나오게 해야될듯 */}
            {groupInfo.leaderId === userInfo.id
            ?
            <div>
                <form onSubmit={getUserInfo}>유저e-mail
                    <input type="text" value={emailInputValue} name="userEmail" onChange={inputEmail}></input><button>검색</button>
                </form>
                <div>
                    {userSearch(addToUser)}
                </div>
            </div>
            :
            null
            }
        </div>
    );
};

export default InviteGroup;

