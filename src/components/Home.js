import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  const getUsers = () => {
    return axios.get('/users');
  }

  useEffect(() => {
    const users = getUsers();
    Promise.resolve(users).then(res => {console.log(res.data); setMsg(res.data[0].name); setLoading(false)});
  }, []);
  
  return (
    <div>
      Hi
      {loading ? null : msg}
    </div>
  )
}
