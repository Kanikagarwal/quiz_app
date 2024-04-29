const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
var _ = require("lodash");
const { JSDOM } = require('jsdom');
const { log } = require("console");
// import { optionBtnValue } from "./public/scripts/ques.mjs";
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine",'ejs');





let btnValue="";
let quizData;
let ques1="";
let ques2="";
let ques3="";
let ques4 = "";
let ques5 = "";
const API_KEY = "DRbLDvZAPTwvBUlBXNxwPevMHwkxNEHFeWQzT7b2";
const url = `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&limit=5&category=${btnValue}`;
// const url = 'https://the-trivia-api.com/v2/questions?category=music&limit=5&difficulty=easy&preview=true&tags=music';


app.get("/",function (req,res) {
    res.render("candidate");
    
})



app.post("/index",function (req,res) {
   
    res.render("index");
})


app.get("/ques",function (req,res) {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const document = dom.window.document;
let newArr = document.querySelectorAll(".optionNumber");
Array.from(newArr).forEach(e=>{
    e.addEventListener("click",function (req,res) {
        console.log("clicked");
    })
})

})







app.post("/ques",function (req,res) {
    
    const listItem1 = req.body.listItem1;
    const listItem2 = req.body.listItem2;
    const listItem3 = req.body.listItem3;
    const listItem4 = req.body.listItem4;
    const listItem5 = req.body.listItem5;
    let selectedBtn = listItem1+listItem2+listItem3+listItem4+listItem5;
    // console.log(selectedBtn);
    
    switch (selectedBtn) {
        case "Linuxundefinedundefinedundefinedundefined":
            btnValue = "Linux";
            break;

            case "undefinedNetworkingundefinedundefinedundefined":
            btnValue = "Networking";
            break;
           
            case "NaNDevOpsundefinedundefined":
                btnValue = "DevOps";
                break;

                case "NaNProgrammingundefined":
            btnValue = "Programming";
            break;

            case "NaNCloud":
            btnValue = "Cloud";
            break;
       
    }
    // console.log(btnValue);
   
    https.get(url,function(response){
        
        let responseData = '';
        

        response.on("data",function (data) {
            responseData += data;
        });

        response.on("end", function() {
            try {
                quizData = JSON.parse(responseData);
                ques1=quizData[0].question;
                ques2=quizData[1].question;
                ques3=quizData[2].question;
                ques4=quizData[3].question;
                ques5=quizData[4].question;

                var newVar = (_.findKey(quizData[0].correct_answers,val => val === 'true')).substr(7,1);
                var newVar2 = (_.findKey(quizData[1].correct_answers,val => val === 'true')).substr(7,1);
                var newVar3 = (_.findKey(quizData[2].correct_answers,val => val === 'true')).substr(7,1);
                var newVar4 = (_.findKey(quizData[3].correct_answers,val => val === 'true')).substr(7,1);
                var newVar5 = (_.findKey(quizData[4].correct_answers,val => val === 'true')).substr(7,1);
                // console.log(newVar);
                // console.log(newVar1);
                // console.log(newVar2);
                // console.log(newVar3);
                // console.log(newVar4);
                // console.log(newVar5);
                // console.log(quizData[0].answers["answer_a"]);

                let option1 = quizData[0].answers["answer_a"];
                let option2 = quizData[0].answers["answer_b"];
                let option3 = quizData[0].answers["answer_c"];
                let option4 = quizData[0].answers["answer_d"];
                let option5 = quizData[1].answers["answer_a"];
                let option6 = quizData[1].answers["answer_b"];
                let option7 = quizData[1].answers["answer_c"];
                let option8 = quizData[1].answers["answer_d"];
                let option9= quizData[2].answers["answer_a"];
                let option10 = quizData[2].answers["answer_b"];
                let option11 = quizData[2].answers["answer_c"];
                let option12 = quizData[2].answers["answer_d"];
                let option13 = quizData[3].answers["answer_a"];
                let option14 = quizData[3].answers["answer_b"];
                let option15 = quizData[3].answers["answer_c"];
                let option16 = quizData[3].answers["answer_d"];
                let option17 = quizData[4].answers["answer_a"];
                let option18 = quizData[4].answers["answer_b"];
                let option19 = quizData[4].answers["answer_c"];
                let option20 = quizData[4].answers["answer_d"];
                res.render("ques",{
                    ques1:ques1,
                    ques2:ques2,
                    ques3:ques3,
                    ques4:ques4,
                    ques5:ques5,
                    topic: btnValue,
                    option1:option1,
                    option2:option2,
                    option3:option3,
                    option4:option4,
                    option5:option5,
                    option6:option6,
                    option7:option7,
                    option8:option8,
                    option9:option9,
                    option10:option10,
                    option11:option11,
                    option12:option12,
                    option13:option13,
                    option14:option14,
                    option15:option15,
                    option16:option16,
                    option17:option17,
                    option18:option18,
                    option19:option19,
                    option20:option20,
                });
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        })
    .on('error',(e)=>{
        console.error(e);
    })
    })
    
})






app.listen(3000, function () {
    console.log("Server started at port 3000");
})