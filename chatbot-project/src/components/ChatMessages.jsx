    
   import { ChatMessage } from './ChatMessage'; 
  import { useRef,useEffect } from 'react'
  import './ChatMessages.css'
    
  export function ChatMessages({chatMessages}){
        const chatMessagesRef= useRef(null)
        useEffect(()=>{
         const containerElem =chatMessagesRef.current;
        if(containerElem){
          containerElem.scrollTop=containerElem.scrollHeight;
        }
         
          
        },[chatMessages]);

        return (
          <div className="chat-messages-container"
          ref={chatMessagesRef}
          >
            {chatMessages.map((chatMessage)=>{
            return (
                <ChatMessage 
                message ={chatMessage.message}
                sender ={chatMessage.sender}
                key ={chatMessage.key}
                />
              );
            })}    
          </div>
        );
      }

// export default ChatMessages;