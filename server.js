const express=require("express");
const app=express();
const http=require("http") //socket io use htttp
const socketio=require("socket.io")
const server=http.createServer(app) //create server using http
const io=socketio(server) //create socket using server


app.get("/",function(req,res){
res.send("hey buddy")
})

server.listen(3000)
