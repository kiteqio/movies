import React, { useState } from 'react';
import styles from './Styles/SignupStyles.module.css';

const SignupComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [inputEmail, setEmail] = useState('');
  const [inputId, setInputId] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFirebaseUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

  const handleMongoDBSignup = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }
  
    const dataToSend = {
      email: inputEmail,
      id: inputId,
      fileuploadname: file.name, // This line is fine, TypeScript will now know that `file` is not `null`
    };
  
    try {
      const response = await fetch('/api/createaccount', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Data inserted successfully');
        console.log(dataToSend);
      } else {
        console.error('Failed to insert data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  
  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleFirebaseUpload();
    await handleMongoDBSignup();
  };

  return (
    <div className={styles.SignupContainer}>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
          background-color: #1e1f22;
        }
        * {
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
      <form
        className={styles.SignupForm}
        onSubmit={handleSignup}
        method="post"
        encType="multipart/form-data"
      >
        <div className={styles.fileUpload}>
          <input
            className={styles.file}
            type="file"
            onChange={handleFileChange}
          />
          <img
            className={styles.profile}
            src="camera.png"
            alt="Profile"
          />
        </div>
        <input
          className={styles.SigngupInputs}
          type="text"
          value={inputEmail}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className={styles.SigngupInputs}
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="ID"
        />

        <button
          className={styles.InputButton}
          type="submit"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupComponent;
