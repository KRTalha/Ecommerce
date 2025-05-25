
import RobotProfileImg from '../assets/robot.png';
import UserProfileImg from '../assets/fgt.jpg';
import dayjs from 'dayjs';
import './ChatMessage.css'

 const time= dayjs().valueOf();
    
     
      
    export  function ChatMessage({message,sender}){

      
        return (
        <div className ={
          sender==='user'
            ? 'chat-message-user' 
            : 'chat-message-robot'
        } >
          {sender==='robot' &&( 
            <
              img src={RobotProfileImg}
              className="chat-message-profile"
             
            />
          )}
          <div className="chat-message-text">
             {message }
             <div>
             {dayjs(time).format('HH:mm')}
             </div>
            
             
          </div>
         
          {sender==='user' && (
            <
              img src={UserProfileImg} 
              className="chat-message-profile"
              
            />
          )}

        </div>

        );

      }