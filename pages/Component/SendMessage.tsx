import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../UserContext';
import styles from '../Styles/sendMessageStyle.module.css'

interface SendMessageProps {
  handleSuccessfulSendMessage?: (email: string) => void;
  fetchMessageRoom: (selectedRoom: string) => void;
}


// ... (imports)

const SendMessage: React.FC<SendMessageProps> = ({ fetchMessageRoom }) => {
  const [inputEmail, setEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const router = useRouter();
  const { userEmail, userRoom, userPicture } = useUserContext();

  const fetchCrtAccount = async () => {
    try {
      const dataToSend = {
        email: userEmail,
        fileuploadname: userPicture,
        room: userRoom,
        message: userMessage,
      };
      const response = await fetch('/api/sendmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log('Data inserted successfully');
        console.log(dataToSend);
      } else {
        // Handle non-OK responses (e.g., log or show an error message)
        console.error('Failed to insert data:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle fetch errors (e.g., log or show an error message)
      console.error('Error during fetch:', error);
    }
  };

  const fetchFunctions = () => {
    fetchCrtAccount()
    fetchMessageRoom(userRoom)
  }
  
  return (
    <div className={styles.SendMessageContainer}>
      <input className={styles.SendMessageInputAuto} onChange={(e) => setEmail(e.target.value)} value={userEmail} />
      <input  className={styles.SendMessageInputAuto} value={userRoom} />
      <input   className={styles.SendMessageInputAuto} value={userPicture} />
      <input className={styles.SendMessageInput} onChange={(e) => setUserMessage(e.target.value)} value={userMessage} />
      {/* <p>Email: {inputEmail}</p>
      <p>userMessage: {userMessage}</p>
      <p>Email: {userEmail}</p>
      <p>UserRoom: {userRoom}</p>
      <p>UserPicture: {userPicture}</p> */}
      <button className={styles.SendMessageButton} onClick={() => { fetchFunctions() }}>Send</button>
    </div>
  );
};

export default SendMessage;
