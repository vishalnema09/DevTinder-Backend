const adminAuth =(req,res,next)=>{
    // logic
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(403).send("You do not have permission to");
    }
    else {
        next();
    }
}
const userAuth =(req,res,next)=>{
    // logic
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(403).send("Unauthorized access");
    }
    else {
        next();
    }
}



module.exports = {
    adminAuth,
    userAuth,

};