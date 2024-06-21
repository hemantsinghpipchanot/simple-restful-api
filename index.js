const express = require("express");
const app = express();
const port = 3000;
const path=require("path");
const methodOverride=require('method-override');
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const { v4: uuidv4 } = require('uuid');
let posts=[{
    id:uuidv4(),
    username:"@apnacollege",
    content:"Coding matlab apna college"
},{
    id:uuidv4(),
    username:"@codeblocks",
    content:"codeblocks is a famous code editor"
},{
    id:uuidv4(),
    username:"@leetcode",
    content:"leetcode is famous for interview preparation"
}]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("create.ejs");
});
app.post("/posts",(req,res)=>{
       let {username,content}=req.body;
       let id=uuidv4();
       posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let  post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
     let {id}=req.params;
     let newcontent=req.body.content;
     let  post=posts.find((p)=> id===p.id);
     post.content=newcontent;
     res.redirect("/posts");
});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id!=p.id);
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
let {id}=req.params;
let  post=posts.find((p)=> id===p.id);
if(post){
res.render("show.ejs",{post});
}
res.render("err.ejs");
});
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
