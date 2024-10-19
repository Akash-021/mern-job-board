import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [job, setJob] = useState({ title: '', description: '', experienceLevel: '', endDate: '' });
  const [candidateEmails, setCandidateEmails] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
    console.log("check job",job);
  };

  const handleEmailChange = (e) => {
    setCandidateEmails(e.target.value);
  };

  const handlePostJob = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/jobs', job);
      alert('Job posted successfully');
    } catch (err) {
      alert('Your account is not verified. Verify your email and phone to post jobs.');
    }
  };

  const handleSendJobAlert = async (e) => {
    e.preventDefault();
    try {
      const payload = { jobDetails: job, candidateEmails };
      await axios.post('/email/send-job-alert', payload);
      alert('Job alerts sent successfully!');
    } catch (err) {
      alert('Failed to send job alerts.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Inline Styles
  const containerStyle = {
    width: '60%',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
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
    marginTop: '10px',
  };

  const textAreaStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    height: '100px',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Dashboard</h1>

      <form onSubmit={handlePostJob} style={formStyle}>
        <input name="title" placeholder="Job Title" onChange={handleChange} style={inputStyle} />
        <input name="description" placeholder="Job Description" onChange={handleChange} style={inputStyle} />
        <input name="experienceLevel" placeholder="Experience Level" onChange={handleChange} style={inputStyle} />
        <input name="endDate" type="date" onChange={handleChange} style={inputStyle} />
        <button type="submit" style={buttonStyle}>Post Job</button>
      </form>

      <h2 style={headingStyle}>Send Job Alert</h2>

      <form onSubmit={handleSendJobAlert} style={formStyle}>
        <textarea
          placeholder="Enter candidate emails separated by commas"
          value={candidateEmails}
          onChange={handleEmailChange}
          style={textAreaStyle}
        />
        <button type="submit" style={buttonStyle}>Send Alerts</button>
      </form>

      <button onClick={handleLogout} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
