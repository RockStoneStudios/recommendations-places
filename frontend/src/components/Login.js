import { Cancel, Room } from '@material-ui/icons'
import axios from 'axios';
import React, { useRef, useState } from 'react'
import './login.css';


export const Login = ({setShowLogin,myStorage,setCurrentUser}) => {

    
    const [error,setError] = useState(false);
    const nameRef = useRef()
  
   const passwordRef = useRef();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const user = {
          
            username : nameRef.current.value,
            password : passwordRef.current.value
        
        };
       try{
          const res = await axios.post('/user/login',user);
          console.log(res.data.token);
          setCurrentUser(res.data.username);
          myStorage.setItem('user',res.data.username);
          setShowLogin(false);
          setError(false);
      
       }catch(error){
           setError(true)
       }
    }
    return (
        <div className='loginContainer'>
             <div className='logo'>
                 <Room/>
                 RockStone
             </div>
             <form onSubmit={handleSubmit}>
                 <input type= "text" placeholder='username' ref={nameRef}/>
                
                 <input type= "password" placeholder='Enter Password' ref={passwordRef}/>
                <button className='loginBtn'>Login</button>
                { error && 

               <span className='failure'>Something went wrong!</span>
                 }
             </form>
             <Cancel className='cancel' onClick={()=> setShowLogin(false)} />
        </div>
    )
}
