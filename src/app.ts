import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();//create express application

//Middleware
app.use(express.json());

app.use(cookieParser());// help nodejs to read cookies sent by client(browser)
app.get('/health',(req, res) => {
    res.json({status: "ok"});
});

export default app;