const JWT = require('jsonwebtoken');

// const payload = { sub: user.id, login: user.login }

module.exports.createToken = (id, login) => {
    const payload = { sub: id, login: login };
    const options = { algorithm: "HS256", expiresIn: "10h" };
    const token = JWT.sign(payload, 'secret', options);
    return token;
};

module.exports.checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        next({ msg: '\'x-access-token\' is not prowided', code: 401 })
    }
    JWT.verify(token, 'secret', (err, decoded)=>{
        if (err) {
            next({code: 403, msg: 'wrong JWT token'})
        } else{
            next()
        }
    })
}