const {model,Schema} = require('mongoose');


const UserSchema = new Schema({
    username : {
        type :String,
        required : true,
        min : 3,
        max : 20,
        unique : true
    },
    email : {
        type :  String,
        required : true,
        max : 50,
        unique : true
    },
     password : {
         type : String,
         required : true,
         min : 6,
         max : 20
     }, 
},{
    timestamps : true
});


module.exports = model('User',UserSchema);