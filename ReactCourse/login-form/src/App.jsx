import { useState } from 'react'

import './App.css'

function App(){ 

      const [showPassword , setShowPassword]=useState(true);
      function switchType(){
        if(showPassword){
          setShowPassword(false)
        }else{
          setShowPassword(true)
        }
      }
     
     
      

      return (
        <div className ="Information">
        <p>Hello, welcome to my Website</p>
        <input placeholder='Email' />
        <div className='password-button'>
        <input placeholder="Password" 
        type ={showPassword ?"text":"password"}
        />
        <button className='hide-button'
        onClick={switchType}
        >{showPassword?"Hide":"Show"}</button>
        </div>
        
        <div>
           <button>Login</button>
          <button>Sign up</button>
          
          </div>
         
        </div>
      )
    }

export default App
