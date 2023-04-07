const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));




app.listen(process.env.PORT || 3000 ,function(){
    console.log("Server is running");

});  



app.get("/", function(req,res){

    res.sendFile(__dirname+"/signup.html"); 
});

app.post("/", function(req,res){
    
    var name = req.body.fname;
    var lastname = req.body.lname;
    var email = req.body.email;
    
    var data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: name,
                    LNAME: lastname
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    const options ={
        method: "POST",
        auth:"Halil:a2fb0a02e404c56a520e8de4e06162f79-us11"
    }
    const url ="https://us11.api.mailchimp.com/3.0/lists/76f680c266";
    
    const request = https.request(url,options, function(response){
         if(response.statusCode===200){
            
            res.sendFile(__dirname+"/success.html")
         }
         else{
            res.sendFile(__dirname+"/failure.html");
         }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
    
});

app.post("/failure", function(req,res){

        res.redirect("/");
    
});



// apikey = 2fb0a02e404c56a520e8de4e06162f79-us11


// list adi=76f680c266