const express = require("express");
const app = express();
const message = require('./models/message')


app.use(express.urlencoded({extended : true}));

app.use(express.static(__dirname + '/public'));


app.set("views",__dirname + "/views");
app.set("view engine", "ejs");


app.get("/", (req,res)=>{
    res.render("index", {title: "Mini Messageboard", message : message});
});


app.get("/new", (req,res)=>{
    res.render("form");
});


app.post("/new", (req,res)=>{
    const messageText = req.body.messageText;
    const messageUser = req.body.messageUser;


    message.push({text: messageText, user : messageUser, added: new Date()});

    res.redirect("/");
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})