import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from './UserContext';
import styles from './Styles/welcomestyles.module.css';
interface WelcomeProps {
  handleSuccessfulWelcome: (email: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ handleSuccessfulWelcome }) => {
  const router = useRouter();
  const handleLogin = () => {
        router.push('/Login');
  };

  const handleSignup = () => {
    router.push('/SignupComponent');

};


  return (
    <div className={styles.WelcomeContainer}>
      <button className={styles.InputButton} onClick={() => { handleLogin(); }}>Login</button>
      <button className={styles.InputButton} onClick={() => { handleSignup(); }}>Signup</button>
    </div>
  );
};

export default Welcome;
