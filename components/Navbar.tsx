
import React from 'react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  cartCount: number;
  onSearch: (q: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, cartCount, onSearch }) => {
  return (
    <nav className="glass-nav sticky top-0 z-50 py-3">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          onClick={() => setCurrentPage('home')}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-all">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 hidden sm:block">Китобхона</span>
        </div>

        {/* Search Bar */}
        <div className="flex-grow max-w-lg relative group">
          <input 
            type="text" 
            placeholder="Китоби дилхоҳро ҷӯед..." 
            className="w-full bg-slate-100/50 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:bg-white outline-none transition-all placeholder-slate-400"
            onChange={(e) => {
              onSearch(e.target.value);
              if (currentPage !== 'catalog' && e.target.value.length > 0) setCurrentPage('catalog');
            }}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Menu Actions */}
        <div className="flex items-center gap-1 md:gap-3">
          <button 
            onClick={() => setCurrentPage('catalog')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentPage === 'catalog' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Феҳрист
          </button>
          
          <button 
            onClick={() => setCurrentPage('cart')}
            className="relative p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => setCurrentPage('admin')}
            className={`p-2.5 rounded-xl transition-all ${currentPage === 'admin' ? 'bg-indigo-600 text-white shadow-indigo-200 shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
