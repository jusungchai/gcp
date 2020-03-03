import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Upload File");

  const getUsers = () => {
    return axios.get('/users');
  }

  useEffect(() => {
    const users = getUsers();
    Promise.resolve(users).then(res => { console.log(res.data); setMsg(res.data[0].name); setLoading(false) });
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const uploaded = axios.post('/upload', formData);
    Promise.resolve(uploaded).then(res => { console.log(res.data) }).catch(err => console.log(err));
  }
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  return (
    <div>
      Hi
      {loading ? null : msg}
      <form>
        <div>
          <input type='file' onChange={handleChange} />
          <label>
            {fileName}
          </label>
          <button onClick={handleUpload}>Upload</button>
        </div>
      </form>
    </div>
  )
}
