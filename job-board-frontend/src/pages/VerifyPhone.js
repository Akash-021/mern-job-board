
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'; // axios setup with the base URL

function VerifyPhone() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
 
  const sendOTP = async () => {
    console.log("check veriphone:");
    try {
      await axios.post('/users/send-otp', { phone });
      alert('OTP sent successfully!');
      setOtpSent(true);
    } catch {
      alert('Failed to send OTP.');
    }
  };

  const verifyOTP = async () => {
    try {
      await axios.post('/users/verify-otp', { phone, otp });
      alert('Phone number verified successfully!');
      navigate('/login');
    } catch {
      alert('OTP verification failed.');
    }
  };

  const containerStyle = {
    textAlign: 'center',
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    width: '400px',
    margin: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    fontSize: '16px',
    width: '100%',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    marginBottom: '10px',
  };

  const headingStyle = {
    color: '#333',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Phone Verification</h1>
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={otpSent}
        style={inputStyle}
      />
      <button onClick={sendOTP} disabled={otpSent} style={buttonStyle}>
        {otpSent ? 'OTP Sent' : 'Send OTP'}
      </button>

      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={inputStyle}
          />
          <button onClick={verifyOTP} style={buttonStyle}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default VerifyPhone;
