const express = require('express')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 80;

const userRouter = require('./routes/user');
const planRouter = require('./routes/plan');
const plannerRouter = require('./routes/planner');
const groupRouter = require('./routes/group');
const signInRouter = require('./routes/signin');
const signUpRouter = require('./routes/signup');
const signOutRouter = require('./routes/signout');
const reviewRouter = require('./routes/review')
const oauthRouter = require('./routes/OAuth')

//cors설정 개발단계->전부*
app.use(cors());
//req.cookie
app.use(cookieParser());
//express -> body-parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Router 분기
app.use('/signin',signInRouter)
app.use('/signup',signUpRouter)
app.use('/signout',signOutRouter)
app.use('/user',userRouter)
app.use('/plan',planRouter)
app.use('/planner',plannerRouter)
app.use('/group',groupRouter)
app.use('/review',reviewRouter)
app.use('/OAuth',oauthRouter)



app.get('/',(req,res) => {res.send('Hello World')})

app.listen(port,()=>console.log('server running'))