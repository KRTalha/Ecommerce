import { useEffect, useState } from 'react'
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';

import dayjs from 'dayjs';
import './App.css'


   
function App(){

     const time= dayjs().valueOf();
     console.log(dayjs(time).format('HH:mm'));
     

console.log('Hello');

         const [chatMessages,setChatMessages]=
          useState(JSON.parse(localStorage.getItem('message'))[{
          
          message:"Hello ChatBot",
          sender: 'user',
          key:'id1'
        }]);

      useEffect(()=>{
        localStorage.setItem('message',
          JSON.stringify(chatMessages));
      },[chatMessages])
      return (
        <div className="app-container">
       
       <ChatMessages 
       chatMessages={chatMessages}
       />
        <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        />

        </div>
      )
    }

export default App
