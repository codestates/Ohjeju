import React from 'react';

const SERVER_URL =process.env.SERVER_URL || 'https://localhos:80';

export default function SigninModal() {

    const [signinInfo, setSigninInfo] = useState({
        email:'',
        password:''
      })
    
    const handleInputvalue = (key) => (e) => {
      setSigninInfo({ ...signinInfo, [key]: e.target.value });
    };

    const handleLogin = () => {
      const payload= {
        email: signinInfo.email,
        password: signinInfo.password,
      }
      axios.post(`${SERVER_URL}/user/signin`, payload)
        .then((res) => {
          axios.get(`${SERVER_URL}/auth`).then((res)=>{
            const newSetUser = {
              userId:res.data.id, //id멀로 셋하지,,
              nickname:res.data.nickname,
              password:res.data.password,
              email:res.data.email,
              tier:res.data.tier,
              score:res.data.score,
              image:res.data.image
            }
            setuserInfo(newSetUser)
            setisLogin(true);
          })
        })
    };
}