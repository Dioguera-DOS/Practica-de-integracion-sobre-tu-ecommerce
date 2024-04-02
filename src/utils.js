const { faker } = require('@faker-js/faker')
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('./config/config');
const SECRETKEY = config.database.SECRETKEY;

//strategy swt con local storage.
const generateToken = (usuario) => jwt.sign({ usuario }, SECRETKEY, { expiresIn: 10 })

//midlleware authorizate/passport
const authCall = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send({ error: "Unauthorized!!!" })
    let token = req.headers.authorization.split(" ")[1]
    try {
        let user = jwt.verify(token, SECRETKEY)
        req.user = user
        console.log(token)
        next()
    } catch (error) {
        return res.status(401).json(error.message);

    }
}

//verify JWT on cookie
const authCallCookie = (req, res, next) => {
    if (!req.cookies.UserSID) return res.status(401).send({ error: "User not autenticate!!!" })
    let token = req.cookies.UserSID
    try {
        let user = jwt.verify(token, SECRETKEY)
        req.user = user
        console.log(token)
        next()
    } catch (error) {
        return res.status(401).json(error.message);

    }
}

//strategy passport jwb con cookie
const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, { session: false }, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({
                    message: info.message ? info.message : info.toString(),
                    detalle: info.detalle ? info.detalle : info.toString()
                })
            }
            req.user = user;
            return next()
        })(req, res, next)

    }
}


const auth = (permisos = []) => function (req, res, next) {
    permisos = permisos.map(p => p.toLowerCase())
    console.log(req.user)
    try {
        if (permisos.includes("adm")) {
            return next()
        }

        if (!req.user || !req.user.usuario.role) {
            res.headers('Content-Type', 'application/json')
            return res.status(401).json({ error: `No tiene permiso para entrar ahí.` })

        }
        if (permisos.includes(req.user.usuario.role.toLowerCase())) {

            res.headers('Content-Type', 'application/json')
            return res.status(403).json({ error: `No tiene privilegios para ese recurso` })

        }

        return next()


    } catch (error) {
        console.log(error.message)

    }
}

const generaProducto = () => {

    let codigo = faker.string.alphanumeric(5)
    let descrip = faker.commerce.product()
    let precio = faker.commerce.price({ min: 100, max: 200, dec: 2, symbol: '$' })
    let cantidad = faker.number.int({ min: 1, max: 20 })
    let subtotal = cantidad * Number(precio.slice(1))
    return {
        descrip, precio, cantidad, subtotal, codigo
    }
}


module.exports = { passportCall, generateToken, authCall, auth, generaProducto }