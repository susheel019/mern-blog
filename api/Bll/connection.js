const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

var blog = '';
function initializeConnection(){
    mongoose.connect(process.env.MONGODB).then( ()=>{
        console.log('database connected successfully');
    }).catch( (err)=>{
            console.log(err);
    })
}
initializeConnection();