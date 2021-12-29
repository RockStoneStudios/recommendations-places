const jwt = require('jsonwebtoken');

const GenerateToken = async(payload) =>{
     return await jwt.sign(payload,process.env.TOKEN_SECRET)
}

module.exports = {
    GenerateToken
}