const express = require("express");
const app= express();
const bodyParser=require("body-parser");
const https=require("https");
const request= require("request");
const async = require('async');
const mailchimp = require("@mailchimp/mailchimp_marketing");
//const mailchimpClient = require("@mailchimp/mailchimp_transactional")("5645e628a6aa93858d6783154480a083-us14");
const port =3000;


app.use(bodyParser.urlencoded({extended: true}))

//app.use(express.static("public"));

app.use('*/images',express.static('public/images'));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

//Setting up MailChimp
mailchimp.setConfig({
    //*****************************ENTER YOUR API KEY HERE******************************
     apiKey: "5645e628a6aa93858d6783154480a083-us14",
    //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
     server: "us14"
    });

    //const list_id = "f7ba498ee6";

//app.post("/",function(req,res){
    
//})

//As soon as the sign in button is pressed execute this
app.post("/",function(req,res){
    //res.send("Hi");
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    // console.log(firstName);
    // console.log(lastName);
    // console.log(email);
    //*****************************ENTER YOU LIST ID HERE******************************
        const listId = "f7ba498ee6";
        //Creating an object with the users data
        const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
        };

    // var data={
    //     members: [{
    //         email_address: email,
    //         status: "subscribed",
    //         merge_fields: {
    //             FNAME: firstName,
    //             LNAME: lastName,
    //         }
    //     } 
    //     ]
    // };

    //Uploading the data to the server
    async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
     email_address: subscribingUser.email,
     status: "subscribed",
     merge_fields: {
     FNAME: subscribingUser.firstName,
     LNAME: subscribingUser.lastName
    }
    })
    //console.log(response);
    
    //run();
  //Just a quick response page
//   res.send("Thanks for the signup, " + firstName + "!");
  //});
//     //If all goes well logging the contact's id
     res.sendFile(__dirname + "/success.html")
     console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
    //}
};
//     //Running the function and catching the errors (if any)
//     // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
//     // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
      run().catch(e => res.sendFile(__dirname + "/failure.html"));
 });


//Try again button
app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || {port},function(){
    //console.log("Express is running at the port: " + process.env.PORT);
})


//Mainchimp API key: 5645e628a6aa93858d6783154480a083-us14
//Mainchimp audience id: f7ba498ee6