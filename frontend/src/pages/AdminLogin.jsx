import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { username, password });
      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin-dashboard');
      }
    } catch (err) {
      alert("Verification Rejected: Invalid identity parameters provided.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-24 p-8 glass-morphic rounded-2xl shadow-2xl border border-slate-800">
      <h3 className="text-2xl font-bold text-center tracking-wide mb-2">Secure Admin Gateway</h3>
      <p className="text-slate-400 text-xs text-center mb-8">Access restricted to verified administrative profiles only.</p>
      <form onSubmit={handleLoginSubmit} className="space-y-5">
        <div>
          <label className="block text-xs text-slate-400 mb-2">Admin Identity Profile ID</label>
          <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none text-white focus:border-cyan-500" value={username} onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-2">Security Key Password</label>
          <input required type="password" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none text-white focus:border-cyan-500" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button type="submit" className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-bold tracking-wider text-sm hover:opacity-90">
          Authenticate Session
        </button>
      </form>
    </div>
  );
}