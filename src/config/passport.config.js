//const local = require('passport-local');
// const github = require('passport-github2')
//const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const {config} = require('../config/config')
// const JWTStrategy = passportJWT.Strategy;
// const ExtractorJwt = passportJWT.ExtractJwt
const SECRETKEY = config.database.SECRETKEY

const extractCokie=(req)=>{
    let token=null
    if(req.cookies.UserSID){
        token=req.cookies.UserSID
    }
    // if(req && req.cookies){
    //     token = req.cookies['userCookie']
    // }

    return token
}

const initPassport=()=>{

    passport.use("jwt", new passportJWT.Strategy(
        {
            secretOrKey:SECRETKEY,
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([extractCokie])
        },
        async(jwt_payload, done)=>{
            
            try {
                if(jwt_payload.usuario.first_name ==="diogo"){
                    return done(null, false, {message:"El usuario tiene el acceso temporalmente restringido", 
                    detalle:"Contacte al administrador"})
                }
                return done(null, jwt_payload) 
            } catch (error) {
                return done(error)
            }
        }
    ))
    
    // passport.use('github', new github.Strategy(
    //             {
    //                 clienteID: '....',
    //                 clienteSecret: '.....',
    //                 callbackURl: '.....',
        
        
    //             },
    //             async (accessToken, refreToken, profile, done) => {
    //                 try {
    //                     console.log('profile')
        
        
        
        
        
        
    //                 } catch (error) {
    //                     return done(error)
        
    //                 }
    //             }
    //         ))
        
    //         //serializador / desarializador
    //         passport.serializeUser((usuario, done) => {
    //             return done(null, usuario._id)
    //         })
        
        
    //         // fin initPassport
    //         passport.deserializeUser(async (id, done) => {
    //             let usuario = await usersModel.findById(id)
    //             return done(null, usuario)
    //         })       
    
}

module.exports = {initPassport}