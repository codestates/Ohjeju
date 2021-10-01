import React, { useState, useEffect, useRef }from 'react';
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
    const removeUserInGroup = (userInfo) => {
        console.log('제거')
        console.log(userInfo)
    }
    const renderUserList = (ele,fun) => {
        console.log('!#@!@#')
        return ele.group.user.map((item,idx) =>  {
            return(
            <li>{item.userName}<button onClick={()=>{fun(item)}}>제거</button></li>
            )
        })
    }

    const userSearch = (fun) => {
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
            <ul>그룹내 유저목록
                {renderUserList(plannerInfo,removeUserInGroup)}
            </ul>
            <form onSubmit={getUserInfo}>
                유저e-mail<input type="text" value={emailInputValue} name="userEmail" onChange={inputEmail}></input><button>검색</button>
            </form>
            <div>
                {userSearch(addToUser)}
            </div>
        </div>
    );
};

export default InviteGroup;

