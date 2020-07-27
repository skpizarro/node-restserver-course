require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//Routes
app.use(require('./routes/usuario'))

mongoose.connect(process.env.URLDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      },
      (err,res)=>{
        if(err) throw new Error;
        console.log("Ok Database connection");
    })
    
app.listen(process.env.PORT,()=>{
    console.log(`Escuchando puerto ${process.env.PORT}`);
});