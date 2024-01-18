import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../UserContext';
import { storage } from '../firebase';
import SendMessage from './Component/SendMessage';
import RoomContainer from './Component/RoomContainer';
import { ref, getDownloadURL } from 'firebase/storage';
import styles from './Styles/ChatRoomStyles.module.css';

interface UserMessage {
  fileuploadname: string;
  // Add other properties as needed
}

// Update SendMessage component's prop types
interface SendMessageProps {
  fetchMessageRoom: (selectedRoom: string) => Promise<void>;
  handleSuccessfulSendMessage?: () => void; // Make it optional
}

export default function ChatRoom() {
  const { query } = useRouter();
  const { userEmail } = useUserContext();
  
  // Explicitly define the type for roomData
  const [roomData, setRoomData] = useState<UserMessage[]>([])

  const { updateUserRoom, userRoom, userPicture } = useUserContext();

  const fetchMessageRoom = async (selectedRoom: string) => {
    try {
      const response = await fetch(`../api/roommessages?room=${selectedRoom}`, {
        method: 'GET',
      });

      if (response.ok) {
        const roomDataJson: UserMessage[] = await response.json();

        const imageUrlPromises = roomDataJson.map(async (userMessage: UserMessage) => {
          const imageUrl = await getImageUrl(userMessage.fileuploadname);
          return { ...userMessage, imageUrl };
        });

        const roomDataWithUrls = await Promise.all(imageUrlPromises);
        setRoomData(roomDataWithUrls);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    console.log('useEffect triggered. Fetching room messages...');
    fetchMessageRoom(userRoom);
  }, [userRoom]);

  const getImageUrl = async (fileName: string) => {
    const storageRef = ref(storage, `imagestwo/${fileName}`);
    try {
      const url = await getDownloadURL(storageRef);
      console.log(url);
      return url;
    } catch (error) {
      console.error('Error getting download URL:', error);
      return null;
    }
  };

  return (
    <div className={styles.chatRoomContainer}>
      {/* Add your global styles here */}
      {/* ... (other code remains the same) */}
      <RoomContainer
        fetchMessageRoom={fetchMessageRoom}
        roomData={roomData}
        getImageUrl={getImageUrl}
      />
      <SendMessage fetchMessageRoom={fetchMessageRoom} />
    </div>
  );
}
