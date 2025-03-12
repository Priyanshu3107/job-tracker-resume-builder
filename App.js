import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('Applied');

  const [resume, setResume] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    skills: '',
    experience: '',
  });

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs'));
    if (storedJobs) setJobs(storedJobs);
  }, []);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = () => {
    if (jobTitle.trim() && company.trim()) {
      setJobs([...jobs, { jobTitle, company, status }]);
      setJobTitle('');
      setCompany('');
      setStatus('Applied');
    }
  };

  const deleteJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
  };

  const generateResume = () => {
    const doc = new jsPDF();
    doc.text(`Name: ${resume.name}`, 10, 10);
    doc.text(`Email: ${resume.email}`, 10, 20);
    doc.text(`Phone: ${resume.phone}`, 10, 30);
    doc.text(`Education: ${resume.education}`, 10, 40);
    doc.text(`Skills: ${resume.skills}`, 10, 50);
    doc.text(`Experience: ${resume.experience}`, 10, 60);
    doc.save('Resume.pdf');
  };

  return (
    <div className="container">
      <h1>Job Tracker</h1>
      <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job Title" />
      <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>
      <button onClick={addJob}>Add Job</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            {job.jobTitle} at {job.company} - {job.status}
            <button onClick={() => deleteJob(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <h1>Resume Builder</h1>
      <input value={resume.name} onChange={(e) => setResume({ ...resume, name: e.target.value })} placeholder="Full Name" />
      <input value={resume.email} onChange={(e) => setResume({ ...resume, email: e.target.value })} placeholder="Email" />
      <input value={resume.phone} onChange={(e) => setResume({ ...resume, phone: e.target.value })} placeholder="Phone" />
      <input value={resume.education} onChange={(e) => setResume({ ...resume, education: e.target.value })} placeholder="Education" />
      <input value={resume.skills} onChange={(e) => setResume({ ...resume, skills: e.target.value })} placeholder="Skills" />
      <input value={resume.experience} onChange={(e) => setResume({ ...resume, experience: e.target.value })} placeholder="Experience" />
      <button onClick={generateResume}>Generate PDF</button>
    </div>
  );
}

export default App;
