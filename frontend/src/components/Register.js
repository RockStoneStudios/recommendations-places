import { Cancel, Room } from '@material-ui/icons'
import axios from 'axios';
import React, { useRef, useState } from 'react'
import './register.css';


export const Register = ({setShowRegister}) => {

    const [success,setSucces] = useState(false);
    const [error,setError] = useState(false);
  
   const nameRef = useRef();
   const emailRef = useRef();
   const passwordRef = useRef();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const newUser = {
            username : nameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value
        
        };
       try{
          const res = await axios.post('/user/register',newUser);
          console.log(res.data);
          setError(false);
          setSucces(true);
       }catch(error){
           setError(true)
       }
    }
    return (
        <div className='registerContainer'>
             <div className='logo'>
                 <Room/>
                 RockStone
             </div>
             <form onSubmit={handleSubmit}>
                 <input type= "text" placeholder='username' ref={nameRef}/>
                 <input type= "email" placeholder='email' ref={emailRef}/>
                 <input type= "password" placeholder='Enter Password' ref={passwordRef}/>
                <button className='registerBtn'>Register</button>
               
                 {success && 
               <span className='success'>Successfull. You can login now!</span>
                 } { error && 

               <span className='failure'>Something went wrong!</span>
                 }
             </form>
             <Cancel className='cancel' onClick={()=> setShowRegister(false)} />
        </div>
    )
}
