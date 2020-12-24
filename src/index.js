const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const posts= require("./initialData");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
let numberOfAPICall=0;
let intialMax=0;

app.get('/api/posts', (req,res) => {
if(numberOfAPICall >= 5){
res.status(429).send({message: "Exceed Number of API Calls"});
return;
}
const ParsedMax = Number(req.query.max || 10);
const max = ParsedMax>20 ? 10: ParsedMax;
let finalMax = max;
if(intialMax !== null){
    finalMax = Math.min(finalMax,intialMax);
}
const topMax = posts.filter((value,idx) => idx< finalMax);
res.send(topMax);

if(intialMax === null){
    intialMax = max;
    numberOfAPICall++;
    setTimeout(() =>{
        intialMax = null;
        numberOfAPICall=0;
    },30*1000);
}else{
    numberOfAPICall++;
}
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
