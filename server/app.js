require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 80;

const signRouter = require('./routes/sign');
const userRouter = require('./routes/user');
const planRouter = require('./routes/plan');
const plannerRouter = require('./routes/planner');
const groupRouter = require('./routes/group');
const reviewRouter = require('./routes/review');
const attractionsRouter = require('./routes/attractions');

//express -> body-parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//cors설정 개발단계->전부*
app.use(cors({
  origin: 'http://localhost:3000',
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

app.listen(port,()=>console.log('server running'))