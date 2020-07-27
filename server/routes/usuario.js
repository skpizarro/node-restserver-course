const express = require('express');
const app = express();
const Usuario = require('../models/usuario')

const bcrypt = require('bcrypt');
const _= require('underscore');


app.get('/usuarios',(req,res)=>{
    // los parametros opcionales caen en el objeto query
    // desde un numero de reistro
    let desde = req.query.desde || 0;
    // se convierte en numero
    desde = Number(desde);

    // cantidad de registros por página
    let limite = req.query.limite || 5;
    limite = Number(limite)

    //filtramos en el get solo lo que nos interesa mandar
    Usuario.find({estado:true},'nombre email role estado google img').skip(desde).limit(limite).exec((err,usuarios) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        // IMPORTANTE, La misma condicion que se pone en el find de arriba se debe de poner e el count
        Usuario.countDocuments({estado:true},(err,conteo)=>{
            return res.status(200).json({
                ok:true,
                usuarios,
                numero:conteo
            })
        })
        
    })
})

app.post('/usuarios',(req,res)=>{

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    })

    usuario.save((err,usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        //usuarioDB.password = null;
        
        return res.status(200).json({
            ok:true,
            usuario:usuarioDB
        })

    })

    if(body.nombre === undefined){
        res.status(400).json({ok:false,mensaje:'El nombre es necesario'})
    }

})

app.put('/usuarios/:id',(req,res)=>{

    let id = req.params.id;
    // solo obtenemos del body lo que queremos y permitimos actualizar
    let body = _.pick(req.body,['nombre','email','img','role','estado'])
    
    

    //otra forma menos eficiente
    //let body = req.body;

    // delete body.password;
    // delete body.google;

    Usuario.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        return res.status(200).json({
            ok:true,
            usuario:usuarioDB
        })

    })
})

app.delete('/usuarios/:id',(req,res)=>{
    let id= req.params.id;
    let estadoUsuario={
        estado:false
    }

    Usuario.findByIdAndUpdate(id,estadoUsuario,(err,usuarioBorrado)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        };

        if(!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                err: {message:"El usuario no existe"}
            });
        }

        return res.status(200).json({
            ok:true,
            usuario:usuarioBorrado
        })

    })
})

module.exports = app;