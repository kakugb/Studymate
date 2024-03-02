const User = require("../Models/user");

const adminmiddleware = async (req,res,next)=> {
    try {
        const { id } = req.userData;
        const user = await User.findById(id);
    
        if (!user || (user.role !== "admin" && user.role !== "student")) {
          return res.status(403).json({ message: "Forbidden, admin access only" });
        }
        
    
        next();
      }
      catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
};

module.exports = adminmiddleware;