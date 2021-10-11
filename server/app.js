require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = 80;
const http = require('http');
const server = http.createServer(app);

const signRouter = require('./routes/sign');
const userRouter = require('./routes/user');
const planRouter = require('./routes/plan');
const plannerRouter = require('./routes/planner');
const groupRouter = require('./routes/group');
const reviewRouter = require('./routes/review');
const attractionsRouter = require('./routes/attractions');

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'

const io = require("socket.io")(server, {
  cors: {
      // origin: CLIENT_URL,
      origin:'http://localhost:3000',
      methods: ["GET", "POST"]
  }
})

//express -> body-parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//cors설정 개발단계->전부*
app.use(cors({
  // origin: CLIENT_URL,
  origin:'http://localhost:3000',
  credentials: true
}));
//req.cookie
app.use(cookieParser());

//Router 분기
app.use('/', signRouter);
app.use('/OAuth', signRouter);
app.use('/user', userRouter);
app.use('/plan',planRouter);
app.use('/planner',plannerRouter)
app.use('/group',groupRouter)
app.use('/review',reviewRouter)
app.use('/attractions',attractionsRouter)


app.get('/',(req,res) => {res.send('Hello World')})

io.on('connection', (socket) => {
  socket.on('join rooms', (msg) => {
      socket.join(`groupNum=${msg.groupNum}`)
      socket.on('nowchating-back',(item)=>{
          socket.to(`groupNum=${msg.groupNum}`).emit('nowchating-front',{userName:item.userName,content:item.content})
      })
      socket.to(`groupNum=${msg.groupNum}`).emit('welcome',{groupName:`groupNum=${msg.groupNum}`,userName:msg.userName,content:`님이 group${msg.groupNum}에 입장하셧습니다`})

      socket.on('disconnecting',(reason) => {
          socket.to(`groupNum=${msg.groupNum}`).emit('userout',{userName:msg.userName,content:`님이 떠낫습니다`})
      })
      
      socket.on('chat',(msg) => {
          socket.emit('mymsg', { userName:'나', content: msg.content })
          socket.to(`groupNum=${msg.groupNum}`).emit('broadcast', { userName: msg.userName, content: msg.content })
      })
  })
  socket.on('join rooms2', (msg) => {
    socket.join(`groupNum=${msg.groupNum}`)
    socket.on('nowchating-back',(item)=>{
        socket.to(`groupNum=${msg.groupNum}`).emit('nowchating-front',{userName:item.userName,content:item.content})
    })
    socket.to(`groupNum=${msg.groupNum}`).emit('welcome2',{groupName:`groupNum=${msg.groupNum}`,userName:msg.userName,content:`님이 group${msg.groupNum}에 입장하셧습니다`})

    socket.on('disconnecting',(reason) => {
        socket.to(`groupNum=${msg.groupNum}`).emit('userout',{userName:msg.userName,content:`님이 떠낫습니다`})
    })
    
    socket.on('chat',(msg) => {
        socket.emit('mymsg', { userName:'나', content: msg.content })
        socket.to(`groupNum=${msg.groupNum}`).emit('broadcast', { userName: msg.userName, content: msg.content })
    })
    
    socket.on('peer-offer',({offer,groupName})=>{
        socket.to(groupName).emit('peer-offer',{offer,groupName})
    })

    socket.on('peer-answer',({answer,groupName})=>{
        socket.to(groupName).emit('peer-answer',{answer,groupName})
    })

    socket.on('peer-ice',({ice,groupNum}) => {
        const groupName = `groupNum=${groupNum}`
        console.log(ice)
        if(ice!==null) socket.to(groupName).emit('peer-ice',({ice}))
    })
    
    socket.on('shareDisplayOn',({groupNum})=>{
        console.log('on')
        const groupName = `groupNum=${groupNum}`
        socket.to(groupName).emit('shareDisplayOn')
    })
    socket.on('shareDisplayOff',({groupNum})=>{
        console.log('off')
        const groupName = `groupNum=${groupNum}`
        socket.to(groupName).emit('shareDisplayOff')
    })
})
})

server.listen(PORT,()=>console.log(`server running ${PORT}`))
