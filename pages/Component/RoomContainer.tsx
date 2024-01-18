// pages/api/RoomContainer.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../UserContext';
import { storage } from '../../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import styles from '../Styles/roomContainerStyles.module.css'
interface RoomContainerProps {
  fetchMessageRoom: (selectedRoom: string) => void;
  roomData: any[]; // Adjust the type based on your actual data structure
  getImageUrl: (fileName: string) => Promise<string | null>; // Adjust the type based on your actual return type
}

const RoomContainer: React.FC<RoomContainerProps> = ({ fetchMessageRoom, roomData, getImageUrl }: RoomContainerProps) => {
  const router = useRouter();
  const { updateUserRoom, userRoom } = useUserContext();

 const handleIntroductionClick = () => {
    updateUserRoom('Introduction', () => {
      fetchMessageRoom('Introduction');
    });
  };

  const handleMessageClick = () => {
    updateUserRoom('message', () => {
      fetchMessageRoom('message');
    });
  };

  setTimeout(function () {
    fetchMessageRoom(userRoom);
}, 5000)

  return (
    <div className={styles.RoomContainer}>
         
      <div className={styles.MenuContainer}>
      <p onClick={(e) => { updateUserRoom('Introduction'); fetchMessageRoom('Introduction'); }}>#Introduction</p>
        <p onClick={(e) => { updateUserRoom('message'); fetchMessageRoom('message');}}>#Messages</p>

      </div>
      <div className={styles.MessagesContainer}>

          {roomData.map((userMessage, index) => (
            <div className={styles.UserContainer} key={index}>
                <img
                src={userMessage.imageUrl}
               
                className={styles.imageCOntainer}
                alt={userMessage.fileuploadname}
              />
              <div className={styles.TextContainer} >
              <p>{userMessage.email}</p>
              {/* <p>{userMessage.fileuploadname}</p> */}
            
              <p>{userMessage.message}</p>
              </div>
            </div>
          ))}

 

      </div>
    </div>
  );
};

export default RoomContainer;
