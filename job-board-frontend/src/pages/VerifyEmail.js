import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const verify = async () => {
    try {
      await axios.get(`/users/verify-email/${token}`);
      alert('Email verified successfully!');
      navigate('/verify-phone'); // Redirect to login or dashboard
    } catch {
      alert('Email verification failed.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
    },
    card: {
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      textAlign: 'center',
      width: '300px',
    },
    title: {
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Email Verification</h1>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={verify}
        >
          Verify Email
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;