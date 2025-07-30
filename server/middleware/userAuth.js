import jwt from "jsonwebtoken";

async function userAuth(req, res, next) {
    const { token } = req.cookies;
    //console.log("Token from cookies:", token);
    if (!token) {
        //console.log("No token found in cookies");
        return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("Decoded token:", tokenDecode);
        if (tokenDecode.id) {
            req.body = req.body || {}; 
            req.body.userId = tokenDecode.id;
            //console.log("User ID from token:", req.body.userId);
        } else {
            //console.log("Token decode failed");
            return res.json({ success: false, message: "Not Authorized. Login Again" });

        }
        next();

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export default userAuth;