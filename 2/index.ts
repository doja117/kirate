const express=require('express')
const app=express();
import fs from 'fs'
var bodyParser=require('body-parser')
app.use(bodyParser.json());
let count=0;
let flag=[];
app.use(express.static('public'))

const setCounter=(req,res,next)=>{count+=1;next();}

app.use(setCounter);
const calculate = (a, b, c) => {
    // Convert a and b to numbers
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    // Check if c is '%' and b is '0'
    if (c === '/' && numB === 0) {
        return "Stupid Fuck, This Action is not allowed";
    }

    // Perform the operation based on the value of c
    switch (c) {
        case '+':
            return (numA + numB).toString();
        case '-':
            return (numA - numB).toString();
        case '*':
            return (numA * numB).toString();
        case '/':
            if (numB === 0) {
                return "Division by zero is not allowed";
            }
            return (numA / numB).toString();
        case '%':
            return (numA % numB).toString();
        default:
            return "Invalid operation";
    }
};

function middleWare(req,res,next){
    const body=req?.body;
    console.log(body);
    if (!body?.a?.length || !body?.b?.length || !body?.c?.length){
        res.send("Error, Invalid Input");
    } else {   next();}
}
// app.use(middleWare);

app.post('/calculate',(req,resp)=>{
    const body=req?.body;

    console.log(body);
    if (body==undefined || !body?.a?.length || !body?.b?.length || !body?.c?.length){
        resp.send("Error, Invalid Input");
    }
    
    resp.send(calculate(req.body?.a,req?.body?.b,req?.body?.c));
})
app.get('/CalculateSum',(req,resp)=>{
    resp.send("Functionality present for POST REquest Only");
})

app.get('/getCurrentDir',(req,resp)=>{
    fs.readdir(__dirname,'utf-8',(err,data)=>{
        if (err){resp.send("Fuck, SOmething Went Wrong in Reading Data")}
        else {
            resp.send(data);
        }
    })
})


app.get('/sendPage',(req,resp)=>{
    resp.sendFile(__dirname+"/public/index1.html")
})
app.get('/getClicks',(req,res)=>{
    if (count!=null){
    res.send(`Number of Clicks : ${count}`);
    }   else {
        res.send("Backend Coder is retarted");
    }
})


app.get('/Sum1To10',(req,resp)=>{
    const sum=(10*11)/2;
    resp.send(`${sum}`);
})
    app.post(`/CalculateSum`,(req,resp)=>{
        const body=req.body;
        const sum=body?.a+body?.b;
        resp.send(`${body?.a} + ${body?.b} = ${sum}`)
    })

    app.get('/*',(req,resp)=>{
        resp.sendFile(__dirname+`/public/images.jpg`)
    })
app.listen(3000,()=>{console.log(`Listening on 3000`)});