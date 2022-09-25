const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Admin = require("../api/models/admin.model");


passport.use('local-admin',
  new LocalStrategy(async (username, password, done) => {
    
      // Match Email's User
      const user = await Admin.findOne({ Usuario: username });
      
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
  Admin.findOne({Usuario: user}, (err, user) => {
    done(err, user);
  });
});