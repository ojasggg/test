const mongoose = require("mongoose"); 


//creating a database.

mongoose.connect('mongodb://127.0.0.1:27017/fitness',{
    useNewUrlParser : true,
    useCreateIndex :true ,
    useUnifiedTopology : true 
})