const helpers = {}

helpers.isAuthenticated = (req,res,next) =>{
    
    if(req.isAuthenticated()){
        
        return next();
    }
    res.redirect('/signin/Estudiantes')
};
module.exports=helpers;