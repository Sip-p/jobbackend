import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        // 1. Grab the VIP pass (token) out of the cookie jar
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not logged in! No VIP pass found." });
        }

        // 2. Verify the pass is real using our secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

        // 3. Find the user in the database (to make sure they haven't deleted their account!)
        // .select("-password") means "Give me everything EXCEPT the password"
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "This account no longer exists." });
        }

        // 4. Attach the user data directly to the request! 
        // Now, any function that happens after this knows EXACTLY who is making the request!
        req.user = user;
console.log("TOKEN:", token);
console.log("DECODED:", decoded);
console.log("USER:", user);
        // 5. Open the door and let them through to the controller!
        next();


    } catch (error) {
        // If the token is fake or expired, jwt.verify automatically throws an error to this catch block!
        return res.status(401).json({ success: false, message: error.message });
    }
};
