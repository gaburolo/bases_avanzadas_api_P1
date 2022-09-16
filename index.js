const express = require('express');
const bodyParser = require('body-parser');

const dbConnect = require('./src/config/connection');
const userRoutes = require('./src/api/routes/student.routes');
const adminRoutes = require('./src/api/routes/admin.routes');
const clubsRoutes = require('./src/api/routes/clubs.routes');
const app = express();

const port = 8001;

app.use(
    bodyParser.json({
        limit: '20mb'
    
})
);

app.use(
    bodyParser.urlencoded({
        limit: '20mb',
        extended: true
    })
)

app.use(userRoutes);
app.use(adminRoutes);
app.use(clubsRoutes);

app.get('/',(req,res)=>{
    res.send('Sistema gestor de Clubes')
});

dbConnect();
app.listen(port, () => console.log(`Server running 🚀 on port: ${port}... `));
