const jwt = require('jsonwebtoken');


//Verificar Token

let verificaToken = (req,res,next) =>{
    // obtenemos los headers
    let token = req.get('token');
    // verificamos la validez del token
    jwt.verify(token,process.env.SEED,(err,decoded)=>{
        if (err){
            return res.status(401).json({
                ok:false,
                err:{
                    message:"Token no válido"
                }
            })
        }

        // Hacemos que cualquier petición tenga acceso a la información del usuario luego de verificar el token
        req.usuario = decoded.usuario;
        next();
    })
    
   
};


// Verificar AdminRole

let verificaAdminRole = (req,res,next)=>{
    let {role} = req.usuario;

    if (role === "ADMIN_ROLE"){
        next();
    }else{
        return res.json({
            ok:false,
            err:{
                message:"Usuario no es administrador"
            }
        })
    }
    
}

module.exports ={
    verificaToken,verificaAdminRole
}