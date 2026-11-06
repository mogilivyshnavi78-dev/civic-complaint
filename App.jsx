import React, { useState, useEffect } from 'react';
import { Icon } from './LucideIcons';

export const CATEGORIES = [
  'Road Damage',
  'Garbage Accumulation',
  'Water Leakage',
  'Blocked Drainage',
  'Broken Streetlights'
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0b233a] text-white p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Icon name="building" className="w-6 h-6 text-blue-400" />
            <h1 className="font-bold text-lg">CivicResolve AI</h1>
          </div>
          <nav className="space-y-2 text-sm font-semibold">
            <button onClick={() => setCurrentPage('home')} className={`w-full text-left py-2 px-3 rounded-lg flex items-center gap-2 ${currentPage === 'home' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <Icon name="home" className="w-4 h-4" /> Home
            </button>
            <button onClick={() => setCurrentPage('submit')} className={`w-full text-left py-2 px-3 rounded-lg flex items-center gap-2 ${currentPage === 'submit' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <Icon name="filePlus" className="w-4 h-4" /> Submit Complaint
            </button>
            <button onClick={() => setCurrentPage('track')} className={`w-full text-left py-2 px-3 rounded-lg flex items-center gap-2 ${currentPage === 'track' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <Icon name="search" className="w-4 h-4" /> Track Complaint
            </button>
            <button onClick={() => setCurrentPage('dashboard')} className={`w-full text-left py-2 px-3 rounded-lg flex items-center gap-2 ${currentPage === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <Icon name="dashboard" className="w-4 h-4" /> Staff Dashboard
            </button>
            <button onClick={() => setCurrentPage('analytics')} className={`w-full text-left py-2 px-3 rounded-lg flex items-center gap-2 ${currentPage === 'analytics' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <Icon name="barChart" className="w-4 h-4" /> Analytics
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900 capitalize">
            {currentPage === 'home' && 'Municipal Grievance Redressal Portal'}
            {currentPage === 'submit' && 'Register Citizen Grievance'}
            {currentPage === 'track' && 'Public Complaint Tracking'}
            {currentPage === 'dashboard' && 'Staff Command Center'}
            {currentPage === 'analytics' && 'Civic Intelligence & Analytics'}
          </h2>
        </header>

        <p className="text-sm text-slate-500">
          The full integrated interactive frontend is served directly by Flask at <code>http://127.0.0.1:5000/</code> with real-time AI classification, priority scoring, and duplicate detection.
        </p>
      </main>
    </div>
  );
}
