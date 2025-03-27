/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const express = require("express")
const PORT = 3000;
const app = express();
const fs=require('fs')
const bodyParser=require('body-parser');

app.use(bodyParser.json());



const readFile=()=>{
  const dir=__dirname+"/authText.json";
  try {
    const data = fs.readFileSync(dir, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

app.post('/signup',(req,resp)=>{
  const dir=__dirname+"/authText.json"
  fs.readFile(dir,'utf-8',(err,data)=>{
    if (err){
      return resp.status(400).send(`Error Reading from ${dir}`);
    } else {
      let d=(JSON.parse(data));
        if (d){
        for (let i=0;i<d?.length;i++){
          if (d[i]?.username==req?.body?.username){
            return resp.status(400).send("UserName Already Exists");
          }
        }
      }
      
      d?.push({...req?.body,id:d?.length}); 
      fs.writeFile(dir,JSON.stringify(d),(err)=>{
        if (err){ return resp.send("Error Writing in " + dir)}
        else {
          return resp.send("Signup successful").status(201);
        }
      })
    }
  })    
})

app.post('/login',(req,resp)=>{
  const pair=req?.body;
  const d=readFile();
  if (typeof d!=String){
    console.log(pair);
    console.log(d);
    for (let i=0;i<d?.length;i++){
      if (d[i]?.username==pair?.username && d[i]?.password==pair?.password){
        return resp.status(200).send({
          "firstname":d[i]?.firstName,
          "lastname":d[i]?.lastName
        })
      }
    } return resp.status(401).send("No Records Found")
  }
  
})


app.get('/data',(req,resp)=>{
  const {username,password}=req.headers;
  const data=readFile();
  let authCheck=false;
  
  for (let i=0;i<data?.length;i++){
    if (data[i]?.username===username && data[i]?.password===password){
      authCheck=true;
      break; 
    }
  }
  let totalUserList=[];
  if (authCheck){
    for (let i=0;i<data?.length;i++){
      console.log(data[i])
      totalUserList.push(data[i])
    }
    return resp.status(200).send(JSON.stringify(totalUserList));

  }
  return resp.status(401).send("Unauthorized");

})

// app.listen(3000,()=>{console.log('Testing')})


// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server

module.exports = app;
