const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Student = require("../api/models/student.model");


passport.use('local-student',
  new LocalStrategy({
    usernameField: "username",
    },async (username, password, done) => {
    
      // Match Email's User
      const user = await Student.findOne({ Usuario: username });
      
      if (!user) {
        
        return done(null, false, { message: "Not User found." });
      } else{
        const match = await user.matchPass(password)
        if(match){
          return done(null,user);
        }else{
          return done(null, false, {message:"Incorrect Password"})
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.Usuario);
});

passport.deserializeUser((user, done) => {
  
  Student.findOne({Usuario: user}, (err, user) => {
    //console.log(user)
    done(err, user);
  });
});