import React, { useState, useEffect, useRef }from 'react';
const axios = require('axios')

const InviteGroup = ({userInfo,plannerInfo}) => {
    console.log(`invite ${userInfo}`)
    console.log(plannerInfo)
    const [emailInputValue,setEmailInputValue] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [findUser, setFindUser] = useState({
        id:'',
        image:'',
        userName:''
    })
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
            console.log(item)
            alert('추가되엇습니다')
        })
        .catch(item => {
            if(item.response.status === 409) alert('이미존재합니다')
        })
        //여기까지함 -> add하면 그룹묶고 이 그룹을 또 챗컴포넌트에 연결을 하든 하고 채팅방확인해야함
    }

    const inputEmail = (e) => {
        setEmailInputValue(e.target.value)
    }

    const renderUser = (fun) => {
        if(findUser.id > 0){
            //서버랑 요청중에 톱니바퀴라던지 넣으면 더좋을듯
            return (
                <div>
                    <span>유저이름 : {findUser.userName}</span>
                    <span>유저이미지 : {findUser.image}</span>
                    <button onClick={fun}>Add</button>
                    {/* fun=addUser */}
                </div>
            )
        }
    }


    return (
        <div>
            <form onSubmit={getUserInfo}>
                유저e-mail<input type="text" value={emailInputValue} name="userEmail" onChange={inputEmail}></input><button>검색</button>
            </form>
            <div>
                해당유저 : 
                {renderUser(addToUser)}
            </div>
        </div>
    );
};

export default InviteGroup;