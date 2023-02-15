const jwt = require("jsonwebtoken");
const secret = "sosdouinvusdvnsduivnauiUBIUYVbHB UHiuhiug";

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        res.status(401).json({ message: "Token xato" });
        return;
    }

    const token = authHeader.replace("Bearer", "");
    try {
        const payload = jwt.verify(token, secret);
        if (payload.type !== "access") {
            res.ststus(401).res.json({ message: "Token xato" });
            return;
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: "Token expired" });
            return;
        }
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: "Token xato" });
            return;
        }
    }
    next();
};
