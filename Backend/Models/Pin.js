const {model,Schema} = require('mongoose');

const PinSchema = new Schema({
     username : {
         type : String,
         required : true
     },
      title : {
          type : String,
          required : true,
          min : 3
      },
      desc : {
          type : String,
          required : true
      },
      rating : {
          type : Number,
          required : true,
          min : 0,
          max : 5
      },
      lat : {
           type : Number,
           required : true
      },
       lon : {
           type : Number,
           required : true
       }
},{
    timestamps : true
});


module.exports = model('Pin',PinSchema);