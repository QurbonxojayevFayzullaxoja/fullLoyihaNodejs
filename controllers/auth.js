const userdb = require('../model/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secret = 'sosdouinvusdvnsduivnauiUBIUYVbHB UHiuhiug';
const tokendb = require('../model/token')
const { generateAccessToken, generateRefreshToken, replaceDBRefreshToken } = require('../helpers/authHelper');

const updateToken = (userId) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken();
    let userData = false
    userdb.findOne({ _id: userId }).then(data=>userData=data)

    return replaceDBRefreshToken(refreshToken.id, userId)
        .then(() => ({
            accessToken,
            refreshToken: refreshToken.token,
            userId,
            userData,
            message:"Sayitg hush kelibsiz",

        }))
}

const signIn = (req, res) => {
    const { user_login, user_password } = req.body
    userdb.findOne({ user_login })
        .then((user) => {
            if (!user) {
                return res.json({ message: "bunday foydalanuchi mavjud emas" });
            }

            const isValid = bcrypt.compareSync(user_password, user.user_password)
            if (isValid) {
                updateToken(user._id).then(tokens => res.json(tokens));

            }
            else {
                res.status(400).json({ message: "parolni hato kiritingiz" })
            }
        })
        .catch(err => res.status(501).json({ message: err.message }))
}

const refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    let payload;
    try {
        payload = jwt.verify(refreshToken, secret);
        if (payload.type !== 'refresh') {
            res.status(400).json({ message: "token xato" })
            return;
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(400).json({ message: "token expired" })
            return;
        } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(400).json({ message: "token xato" })
            return;
        }


    }
    tokendb.finOne({ tokenId: payload.id })
        .exec()
        .then((token) => {
            if (token === null) {
                throw new Error('token xato');
            }

            return updateToken(token.userId);
        })
        .then(tokens => res.json({ tokens }))
        .catch(err => res.status(400).json(err))
};



module.exports = { signIn, refreshToken }