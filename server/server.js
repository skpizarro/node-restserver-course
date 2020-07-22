require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/usuarios',(req,res)=>{
    res.json({nombre:"Juan PAblo"})
})

app.post('/usuarios',(req,res)=>{

    let body = req.body;

    if(body.nombre === undefined){
        res.status(400).json({ok:false,mensaje:'El nombre es necesario'})
    }else{

    }

    res.json({body})
})

app.put('/usuarios/:id',(req,res)=>{

    let id = req.params.id;

    res.json({id,nombre:"Juan PAblo"})
})

app.delete('/usuarios',(req,res)=>{
    res.json({nombre:"Juan PAblo"})
})

app.listen(process.env.PORT,()=>{
    console.log(`Escuchando puerto ${process.env.PORT}`);
});