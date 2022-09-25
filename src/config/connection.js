const mongoose = require('mongoose');
//mongodb://127.0.0.1:27017/dbClubes
const DB_URI = `mongodb://127.0.0.1:27017/dbClubes`;


module.exports = () => {
    const connect = () => {
        mongoose.connect(
            DB_URI,
            {
                keepAlive: true,
               
                useNewUrlParser: true,
                useUnifiedTopology: true,
                
            },

            (err) => {
                if(err){
                    console.log('DB: ERROR');
                    console.log(err);
                }
                else{
                    console.log('Connection Success')
                }
            }

        )
    }
    connect();

};