const express= require("express");
const bodyparser = require("body-parser");
const https = require("https");
const app = express();


app.set("view engine" , "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));



app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    const unit = "metric";
    const city= req.body.search;
    const apikey="7b48d21caaf6d5b6087f08d2e544d483";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit;
 
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata= JSON.parse(data);
            const temp = weatherdata.main.temp;
            const humid= weatherdata.main.humidity;
            const icon= weatherdata.weather[0].icon;
            const urlicon="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            const spd= weatherdata.wind.speed;
            const weatherdes = weatherdata.weather[0].description;
            

            res.render("list",{
                cityname:city , 
                temperature: temp,
                url: urlicon,
                imagedesc:weatherdes,
                humidity:humid,
                windspeed:spd

            });
            res.sendFile(__dirname +"views/list.ejs");

        })
    })   
    

})

app.listen(3000,function(){console.log("listening on port 3000")});