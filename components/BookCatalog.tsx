
import React, { useState } from 'react';
import { Book, Category } from '../types';

interface BookCatalogProps {
  books: Book[];
  onAddToCart: (b: Book) => void;
  onViewBook: (b: Book) => void;
  recentlyViewed?: Book[];
  showFilters?: boolean;
  onSeeMore?: () => void;
}

const CATEGORIES: Category[] = ['Адабиёт', 'Таърих', 'Илм', 'Бачагона', 'Психология'];

const Sparkline: React.FC<{ color?: string }> = ({ color = '#6366f1' }) => {
  const points = [10, 12, 11, 14, 13, 16];
  const width = 24;
  const height = 8;
  const max = Math.max(...points);
  const pathData = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - (p / max) * height;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="inline-block ml-1 opacity-40">
      <path d={pathData} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const BookCatalog: React.FC<BookCatalogProps> = ({ books, onAddToCart, onViewBook, recentlyViewed, showFilters, onSeeMore }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'Ҳама'>('Ҳама');

  const filtered = activeCategory === 'Ҳама' 
    ? books 
    : books.filter(b => b.category === activeCategory);

  return (
    <div className="space-y-16 animate-fade-up">
      {/* Recently Viewed Section */}
      {showFilters && recentlyViewed && recentlyViewed.length > 0 && (
        <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 animate-fade-up">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
             <h3 className="text-xl font-black text-slate-800 tracking-tight font-heading">Китобҳои ба наздикӣ дидашуда</h3>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
            {recentlyViewed.map(book => (
              <div 
                key={`recent-${book.id}`} 
                onClick={() => onViewBook(book)}
                className="flex-shrink-0 w-48 group cursor-pointer"
              >
                <div className="relative aspect-[3/4.2] rounded-2xl overflow-hidden shadow-lg mb-3 ring-1 ring-black/5">
                  <img src={book.coverImage} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt=""/>
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors"></div>
                </div>
                <h4 className="text-sm font-bold text-slate-800 truncate mb-1">{book.title}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showFilters && (
        <div className="flex flex-wrap gap-4 pb-6 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveCategory('Ҳама')}
            className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-500 border-2 ${activeCategory === 'Ҳама' ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200 hover:text-indigo-600'}`}
          >
            Ҳама
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-500 border-2 ${activeCategory === cat ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200 hover:text-indigo-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <p className="text-slate-400 text-2xl font-medium italic font-heading tajik-text">Ҳеҷ асаре дар ин категория ёфт нашуд.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {filtered.map(book => (
            <div key={book.id} className="group flex flex-col h-full animate-fade-up">
              <div 
                onClick={() => onViewBook(book)}
                className="relative cursor-pointer aspect-[3/4.5] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-xl shadow-slate-200/40 group-hover:shadow-[0_40px_80px_-15px_rgba(99,102,241,0.25)] transition-all duration-700 group-hover:-translate-y-3"
              >
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="w-full h-full object-cover transition duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-indigo-600 uppercase tracking-[0.15em] shadow-lg">
                  {book.category}
                </div>
                
                {/* Quick Add Overlay */}
                <div className="absolute bottom-8 left-0 right-0 px-8 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(book);
                    }}
                    className="w-full py-4 bg-white text-indigo-600 font-black rounded-2xl shadow-2xl hover:bg-indigo-600 hover:text-white transition-all text-sm flex items-center justify-center gap-3 active:scale-95"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    ХАРИДАН
                  </button>
                </div>
              </div>

              <div className="pt-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors font-heading tajik-text">{book.title}</h3>
                <p className="text-slate-500 font-semibold text-sm mb-6 uppercase tracking-wider">{book.author}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Арзиш</span>
                    <span className="text-3xl font-black text-slate-900 font-heading">
                      {book.price}<span className="text-xs ml-1 text-slate-400 font-bold">смн</span>
                      <Sparkline color="#818cf8" />
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(book);
                    }}
                    className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-90 flex items-center justify-center group/btn"
                  >
                    <svg className="w-6 h-6 transition-transform group-hover/btn:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {onSeeMore && filtered.length > 0 && (
        <div className="text-center pt-20">
          <button 
            onClick={onSeeMore}
            className="px-16 py-5 border-2 border-slate-200 text-slate-600 font-black rounded-[2rem] hover:border-indigo-600 hover:text-indigo-600 transition-all duration-500 text-sm tracking-widest uppercase hover:shadow-2xl hover:shadow-indigo-50"
          >
            Ҳамаи китобҳо
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCatalog;
