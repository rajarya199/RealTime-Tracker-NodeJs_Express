const express=require("express");
const app=express();
const path=require("path") 
const http=require("http") //socket io use htttp
const socketio=require("socket.io")
const server=http.createServer(app) //create server using http
const io=socketio(server) //create socket using server

app.set("view engine","ejs") //set view engine to ejs
app.set(express.static(path.join(__dirname,"public"))) //set static folder to public

//handle socket connection
io.on("connection",(socket)=>{
console.log("a user connected") 
})

app.get("/",function(req,res){
res.render("index") //render index.ejs file
})

server.listen(3000,()=>{
console.log("server is running on port 3000")
})
