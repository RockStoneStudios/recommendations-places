const Pin = require('../Models/Pin');

const CreatePin = async(req,res)=>{
    const newPin = new Pin(req.body);
     try {
       const result = await  newPin.save();
        if(result) return res.status(201).json({message : "Pin Crated Successfull"});
     }catch(err) {
        res.status(500).json(err);
     }
}

const GetAllPin = async(req,res)=>{
     try{
        const pins = await Pin.find();
        if(pins) return res.status(200).json(pins);
     }catch(error){
        res.status(500).json(error);
     }
}


module.exports = {
    CreatePin,
    GetAllPin
}

