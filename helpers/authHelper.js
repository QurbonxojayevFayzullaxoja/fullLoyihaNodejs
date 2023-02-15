const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4')
const secret = 'sosdouinvusdvnsduivnauiUBIUYVbHB UHiuhiug';
const tokendb = require('../model/token')


const generateAccessToken = (userId) => {
    const payload = {
        userId,
        type: 'access',
    };
    const option = { expiresIn: '1h' }
    return jwt.sign(payload, secret, option);
}

const generateRefreshToken = () => {
    const payload = {
        id: uuid(),
        type: 'refresh',
    };
    const option = { expiresIn: '1h' }
    return {
        id: payload.id,
        token: jwt.sign(payload, secret, option),
    }
}


const replaceDBRefreshToken = (tokenId, userId) => 
    tokendb.findOneAndRemove({ userId })
        .exec()
        .then(() => tokendb.create({ tokenId, userId }))
        .catch(err=>console.log(err));


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDBRefreshToken,
}

