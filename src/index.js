//---------------------------------
const express = require('express');
//const router= express.Router();
const path= require('path');
const exphbs= require('express-handlebars');
const methodOverride= require('method-override');
const session= require('express-session');
//const cookieParser = require('cookie-parser');
const dbConnect = require('../src/config/connection');
const userRoutes = require('../src/api/routes/student.routes');
const adminRoutes = require('../src/api/routes/admin.routes');
const clubsRoutes = require('../src/api/routes/clubs.routes');
const passport = require('passport')

//inicializaciones
const app=express();
require('./config/passport');


//Configuraciones
app.set('port', process.env.PORT || 8000); //Esta línea me dice que si existe un puerto en mi compu que lo use, sino que use el 300
app.set('views', path.join(__dirname, 'views')); //Esta línea permite decirle a node que la carpeta views está en ese directorio

app.engine('.hbs',exphbs.engine({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    clubesDir:path.join(app.get('views'),'clubes'),
    principalDir:path.join(app.get('views'),'principal'),
    usersDir:path.join(app.get('views'),'users'),
    extname:'.hbs'
}));
app.set('view engine', '.hbs');

//Funciones a ejecutar
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
//app.use(cookieParser('mysecretapp'));
app.use(session({
    secret:'mysecretapp',
    resave:false,
    saveUninitialized:true

}));
app.use(passport.initialize());
app.use(passport.session());


//Rutas (URL's dentro de la carpeta routes)

app.use(userRoutes);
app.use(adminRoutes);
app.use(clubsRoutes);
dbConnect();



//Archivos estáticos
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    //res.send("hola");
    res.render('./users/signin_estudiantes');
});

//Variables globales
app.use((req,res,next)=>{
    res.locals.user = req.user;
    next();
});
//module.exports=router;
//Iniciar el servidor
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});

