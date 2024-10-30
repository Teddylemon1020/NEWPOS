import React, { useState } from 'react';
import '../style.css';

const EmployeeTimeTracker = () => {
  const [username, setUsername] = useState('');
  const [log, setLog] = useState([]);
  const [inputDisabled, setInputDisabled] = useState(false);

  const addLog = (action) => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    const newLog = `${username} - ${action} at ${time} on ${date}`;
    setLog((prevLog) => [...prevLog, newLog]);
  };

  const handleTimeIn = () => {
    if (!username) {
      alert("Please enter your name before logging time.");
    } else {
      addLog("Time In");
    }
  };

  const handleTimeOut = () => {
    if (!username) {
      alert("Please enter your name before logging time.");
    } else {
      addLog("Time Out");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);  // Allow the user to type freely
  };

  const handleSubmitName = () => {
    if (username.trim()) {
      setInputDisabled(true);  // Disable the input only when the user clicks "Submit"
    } else {
      alert("Please enter a valid name.");
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    body: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f4',
      padding: '20px',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    userInput: {
      marginBottom: '20px',
      textAlign: 'center',
    },
    input: {
      padding: '10px',
      width: '80%',
      borderRadius: '8px',
      border: '1px solid #ddd',
      marginBottom: '10px',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'spaceAround',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
    },
    log: {
      marginTop: '20px',
      listStyleType: 'none',
      padding: 0,
    },
    logItem: {
      padding: '10px',
      backgroundColor: '#f9f9f9',
      borderBottom: '1px solid #ddd',
    },
  };

  return (
    <div>
      <button className="menu-toggle" onClick={() => window.location.href = 'index.html'}>
        ☰ Menu
      </button>

      <div style={styles.container}>
        <h1 style={styles.title}>Employee Time Tracker</h1>

        <div style={styles.userInput}>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={handleUsernameChange}
            disabled={inputDisabled}
            style={styles.input}
          />
          {!inputDisabled && (
            <button onClick={handleSubmitName} style={styles.button}>
              Submit Name
            </button>
          )}
        </div>

        <div style={styles.buttons}>
          <button onClick={handleTimeIn} style={styles.button}>
            Time In
          </button>
          <button onClick={handleTimeOut} style={styles.button}>
            Time Out
          </button>
        </div>

        <ul style={styles.log}>
          {log.map((entry, index) => (
            <li key={index} style={styles.logItem}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeTimeTracker;
