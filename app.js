const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

let items = [];
let workItems = [];
app.get("/", (req, res)=>{

  let today = new Date;
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  
  const dayString = today.toLocaleDateString("mr-IN", options);
  
  res.render("list", {listTitle: dayString, newItemsList: items});
})

app.get("/work", (req, res)=>{
  res.render("list", {listTitle: "Work List", newItemsList: workItems});
})
app.post("/work", (req, res)=>{
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/");
})

app.post("/", (req, res)=>{
  let item = req.body.newItem;
  if(req.body.list === "Work List"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
})
app.get("/about", (req, res)=>{
  res.render("about");
})

app.listen(8080, (res)=>{
  console.log("server is running on port 8080.");
})
