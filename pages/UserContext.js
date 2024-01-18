// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('example@gmail.com');
  const [userRoom, setUserRoom] = useState('Introduction');
  const [userPicture, setUserPicture] = useState('profile.png');
  const updateUserEmail = (email) => {
    setUserEmail(email);
    // console.log('Updated user email:', email);
  };

  const updateUserRoom = (room) => {
    setUserRoom(room);
    // console.log('Updated user room:', room);
  };

  const updateUserPicture = (picture) => {
    setUserPicture(picture);
    // console.log('Updated user room:', room);
  };

  const fetchUserData = async () => {
    // Fetch user data from your API or localStorage
    // Example: const userData = await fetchUserData();
    // Set the user data using setUserEmail and other functions
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Fetch data when the component mounts

  // console.log('UserProvider rendering. User email:', userEmail);
  // console.log('UserProvider rendering. User room:', userRoom);
  return (
    <UserContext.Provider value={{ userEmail, updateUserEmail, userRoom, updateUserRoom, userPicture, updateUserPicture  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  // console.log('useUserContext hook. Context:', context);
  return context;
};
