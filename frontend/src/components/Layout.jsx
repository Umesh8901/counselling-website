import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-900">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-cyan-500/20">
                A
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">Admission Portal</h1>
                <p className="text-xs font-semibold text-cyan-400 tracking-wider">ENGINEERING</p>
              </div>
            </Link>
            <div className="flex gap-4">
              <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Apply</Link>
              <Link to="/admin-login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Admin Desk</Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}