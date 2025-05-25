import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';
export function ChatInput({chatMessages,setChatMessages} ){
      const [chatInput,setChatInput]=useState('');

      function saveInputText(event){
        setChatInput(event.target.value)
      }

      
     async function sendMessage(){
      setChatInput('');
        const newChatMessages=[
            ...chatMessages,
            {
              message:chatInput,
              sender : 'user',
              key:crypto.randomUUID()
            }]
              setChatMessages(newChatMessages); 
              setChatMessages([
                ...newChatMessages,
                {
                  message:'Loading......',
                  sender:'robot',
                  key:crypto.randomUUID()

                }
              ])
              const response =await Chatbot.getResponseAsync(chatInput);
              setChatMessages([
               ...newChatMessages, 
                {
                  message:response,
                  sender : 'robot',
                  key:crypto.randomUUID()
                }
             ]);       
               setChatInput('');
          }

          function onKeybuttons(event){
            if(event.key ==='Enter'){
              sendMessage();
            }else if
            (event.key==='Escape'){
              setChatInput('');
            }
          }
        return (
          <div className="chat-input-container">

            <input 
              className="input-text"
              placeholder="Enter messege to get response" 
              size ="30"
              onChange ={saveInputText}
              value={chatInput}
              onKeyDown={onKeybuttons}
            />
              <button 
              className="send-button"
              onClick={sendMessage}
              >Send</button>
          </div>
        );
      }
