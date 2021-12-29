const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.DB,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log('Database Connected Successfull');
}).catch(error=>{
    console.log(error);
});



