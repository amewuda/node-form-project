const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const app = new express();

mongoose.connect("mongodb://localhost/again");
app.set("view engine", "ejs");
app.use(fileUpload());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));

const BlogPostSchema = new mongoose.Schema({
    title: String,
    body: String,
    username: String,
    datePosted: {type: Date, default: new Date()},
    image: String
});

const BlogPost = new mongoose.model("BlogPost", BlogPostSchema);

// BlogPost.create({
//     title: 'Selected few here',
//     body: 'We will be selecting more things this incoming week'
//     }, (error, blogpost) =>{
//     console.log(error, blogpost)
// });

app.get("/", function(req,res){
    res.render("great");
});

app.get("/blogg", function(req,res){
    res.render("yoo");
});

app.post("/posts", function(req,res){
    let image = req.files.image;
    image.mv(path.resolve(__dirname, "public/img", image.name), function(error){
        BlogPost.create(req.body, function(err, blogpost){
            if (err){
                console.log(err);
            } else{
                image: "/img/" + image.name
                res.redirect("/");
            };
        });
       
    });
});
    



app.listen(3000, function(req,res){
    console.log("IT IS RESPONDING");
});

