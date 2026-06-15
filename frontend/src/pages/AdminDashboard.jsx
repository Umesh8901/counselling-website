import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/admin-login'); return; }

    axios.get('http://localhost:5000/api/student', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setStudents(res.data))
      .catch(() => { localStorage.clear(); navigate('/admin-login'); });
  }, [navigate]);

  const updateStatus = async (id, currentStatus) => {
    const nextStatusMap = { 'Pending': 'Verified', 'Verified': 'Counselling Scheduled', 'Counselling Scheduled': 'Admission Confirmed' };
    const nextStatus = nextStatusMap[currentStatus] || 'Pending';
    const token = localStorage.getItem('adminToken');

    try {
      await axios.put(`http://localhost:5000/api/student/${id}`, { admissionStatus: nextStatus }, { headers: { Authorization: `Bearer ${token}` } });
      setStudents(students.map(s => s._id === id ? { ...s, admissionStatus: nextStatus } : s));
    } catch (err) {
      alert("Error executing data modification updates.");
    }
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.personalInfo.fullName.toLowerCase().includes(search.toLowerCase()) || s.applicationId.toLowerCase().includes(search.toLowerCase());
    const matchesBranch = filterBranch ? s.preferences.preferredBranch.includes(filterBranch) : true;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Workspace Console</h2>
          <p className="text-slate-400 text-sm">Real-time student counseling profiles monitoring system metrics.</p>
        </div>
        <button onClick={() => { localStorage.clear(); navigate('/admin-login'); }} className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs px-4 py-2 rounded-lg font-semibold tracking-wider uppercase">
          Terminate Session
        </button>
      </div>

      {/* Metrics Cards Grid Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-morphic p-6 rounded-2xl">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Intake Requests</span>
          <span className="text-3xl font-bold tracking-tight text-white block mt-1">{students.length}</span>
        </div>
        <div className="glass-morphic p-6 rounded-2xl">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">Pending Actions</span>
          <span className="text-3xl font-bold tracking-tight text-cyan-400 block mt-1">{students.filter(s => s.admissionStatus === 'Pending').length}</span>
        </div>
        <div className="glass-morphic p-6 rounded-2xl">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">Confirmed Seats</span>
          <span className="text-3xl font-bold tracking-tight text-emerald-400 block mt-1">{students.filter(s => s.admissionStatus === 'Admission Confirmed').length}</span>
        </div>
        <div className="glass-morphic p-6 rounded-2xl">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block">Verified Profiles</span>
          <span className="text-3xl font-bold tracking-tight text-indigo-400 block mt-1">{students.filter(s => s.admissionStatus !== 'Pending').length}</span>
        </div>
      </div>

      {/* Dynamic Operational Search and Filters Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input type="text" placeholder="Search application ID or name..." className="flex-grow md:max-w-xs bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none text-slate-200 focus:border-cyan-500" value={search} onChange={(e)=>setSearch(e.target.value)} />
        <select className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 outline-none" value={filterBranch} onChange={(e)=>setFilterBranch(e.target.value)}>
          <option value="">All Branches</option>
          <option value="Computer Science (CSE)">Computer Science (CSE)</option>
          <option value="Information Technology (IT)">Information Technology (IT)</option>
          <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
        </select>
      </div>

      {/* Premium Data Tables UI */}
      <div className="glass-morphic rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Scores Matrix</th>
                <th className="px-6 py-4">Branches/Colleges Choice</th>
                <th className="px-6 py-4">Process Status</th>
                <th className="px-6 py-4 text-right">Action Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-400">{student.applicationId}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{student.personalInfo.fullName}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{student.personalInfo.mobileNumber}</div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono">
                    <div>CET: <span className="text-cyan-400 font-bold">{student.academicInfo.mhtCetPercentile}%ile</span></div>
                    <div>PCM: {student.academicInfo.pcmMarks}</div>
                  </td>
                  <td className="px-6 py-4 text-xs max-w-xs truncate">
                    <span className="font-medium text-slate-200">{student.preferences.preferredBranch.join(', ') || 'None Selected'}</span>
                    <span className="block text-slate-500 italic mt-0.5">{student.preferences.preferredCollege.join(', ') || 'Any'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${student.admissionStatus === 'Pending' ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' : student.admissionStatus === 'Admission Confirmed' ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' : 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20'}`}>
                      {student.admissionStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => updateStatus(student._id, student.admissionStatus)} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 px-3 py-1.5 rounded-lg font-medium transition-all">
                      Advance Step
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}