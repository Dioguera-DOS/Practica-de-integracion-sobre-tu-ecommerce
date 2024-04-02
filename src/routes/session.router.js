const { Router } = require('express');
const usersModel = require('../dao/models/users.model');
const router = Router();
const crypto = require('crypto');
const {userLogin, perfil, register, logOut, passwordRecovery, passwordRecovery2} = require('../controller/users.controller')

const {auth, passportCall} = require('../utils')


router.post('/login', userLogin);
router.get('/perfil', passportCall('jwt'),auth(["ADM", "INVITADO"]),perfil);
//router.get('/perfil', passportCall('jwt'), perfil);
router.post('/register', register);
router.get('/logout', logOut);
router.post('/recovery',passwordRecovery)
router.get('/recovery2',passwordRecovery2)

router.get('/user',(req,res)=>{

})

module.exports = router

