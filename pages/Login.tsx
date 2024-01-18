import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from './UserContext';
import styles from './Styles/loginStyles.module.css';


interface UserData {
  email: string;
  id: string;
  fileuploadname: string;
  // Add other properties as needed
}

interface LoginProps {
  handleSuccessfulLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ handleSuccessfulLogin }) => {
  const [toggle, setToggle] = useState('off');
  const [inputEmail, setEmail] = useState('');
  const [inputId, setInputId] = useState('');
  const [userData, setUserData] = useState<UserData[]>([]);
  const { updateUserEmail, updateUserPicture } = useUserContext();
  const router = useRouter();

  const handleLogin = () => {
    let isMatch = false;

    userData.forEach(item => {
      if (inputEmail === item.email && inputId === item.id) {
        updateUserEmail(inputEmail);
        updateUserPicture(item.fileuploadname)
        router.push('/ChatRoom');
        isMatch = true;
      }
    });

    if (!isMatch) {
      alert("Incorrect Details");
    }
  };

  const funcFetchData = async () => {
    try {
      const response = await fetch('/api/logindata', {
        method: 'GET',
      });
      if (response.ok) {
        // const loginData = await response.json();
        const loginData: UserData[] = await response.json(); // Specify the type here
        setUserData(loginData);
        console.log(loginData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    funcFetchData(); // Fetch data after the initial render
  }, []); // Empty dependency array ensures it only runs once after the initial render

  return (
    <div className={styles.WelcomeContainer}>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
          background-color: #1e1f22;
        }
        * {
          // border: 2px solid purple;
          color: white;
          font-family: system-ui;
          font-weight: 100;
          text-align: center;
        }

        input {
          color: #060606;
          font-size: 20px;
      
        }
      `}</style>
      <input className={styles.loginInputs} onChange={(e) => setEmail(e.target.value)} value={inputEmail} placeholder='Email' />
      <input className={styles.loginInputs} onChange={(e) => setInputId(e.target.value)} value={inputId} placeholder='ID' />
      {/* <p>Emailsasdakn: {inputEmail}</p>
      <p>Id: {inputId}</p> */}
      <button className={styles.loginButton} onClick={() => { setToggle('on'); handleLogin(); }}>Login Button</button>
    </div>
  );
};

export default Login;
