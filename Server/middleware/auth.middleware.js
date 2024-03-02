const jwt = require("jsonwebtoken");
const blacklistedTokens = new Set();

const authmiddleware = (req, res, next) => {
    try {
        // Check if the Authorization header exists
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ message: "Unauthorized, missing Authorization header" });
        }

        // Split the Authorization header to get the token
        const tokenParts = authorizationHeader.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== "bearer") {
            return res.status(401).json({ message: "Unauthorized, invalid token format" });
        }

        const token = tokenParts[1];
           // Check if the token is blacklisted
           if (blacklistedTokens.has(token)) {
            return res.status(401).json({ message: "Unauthorized, token blacklisted" });
        }
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decodedtoke to the userData 
        req.userData = decodedtoken;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized, invalid token" });
    }
};

module.exports = authmiddleware;
