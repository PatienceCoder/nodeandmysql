const express = require('express')
const path = require('path');
const mysql2 = require('mysql2')
const app = express();

const database = mysql2.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"1234",
    database:"users"
});
database.connect((error) => {
    if(error){
        return console.error(error)
    }
    console.log("Mysql database is connected....")
})

//MIDDLEWARE FOR PARSING THE FORM DETAILS;
app.use(express.urlencoded({extended:true}))
//ROUTE WHICH IS RESPONSIBLE TO DISPLAY HTML FILE
app.get('/',(req,res) => {
    const htmlfile = path.join(__dirname,'htmlfiles','index.html');
    res.sendFile(htmlfile)
})
//ROUTE FOR HANDLING FORM SUBMISSIONS
app.post('/handleform',(req,res) => {
   try{
        const {name,email,password} = req.body;
        const SQL_COMMAND = "INSERT INTO usersdetails (name,email,password) VALUES (?,?,?)";
        database.query(SQL_COMMAND,[name,email,password],(err,result) => {
            if(err){
                console.error(err);
                return res.send("Registration unsuccessful")
            }
            console.log(result);
            res.send("Registration successful")
        })
   }
   catch(err){
    console.error(err);
    res.send("Registration Unsuccessful")
   }
})

app.listen(4000,() => {
    console.log("Server listening...")
})