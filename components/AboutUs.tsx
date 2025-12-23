
import React, { useState } from 'react';
import { getBookRecommendation } from '../services/geminiService';

const AboutUs: React.FC = () => {
  const [interest, setInterest] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!interest) return;
    setLoading(true);
    const result = await getBookRecommendation(interest);
    setRecommendation(result);
    setLoading(false);
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Traditional Motif Decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.04] pointer-events-none rotate-45 translate-x-32 -translate-y-32">
        <svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 0 L100 50 L50 100 L0 50 Z" /></svg>
      </div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="max-w-6xl mx-auto space-y-32">
          
          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-10 animate-fade-up">
              <div className="inline-block px-5 py-2 bg-indigo-50 text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100/50">
                Мо дар маркази фарҳанг ҳастем
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight font-heading tajik-text">
                Китобхонаи мо — <br/>
                Ганҷинаи шаҳри <span className="text-indigo-600 italic">Хуҷанд</span>
              </h2>
              <div className="prose prose-xl text-slate-500 font-medium leading-relaxed tajik-text">
                <p>
                  "Китобхона" дар шаҳри бостонии Хуҷанд, ки яке аз марказҳои асосии илму адаби Тоҷикистон ба шумор меравад, воқеъ аст. Мо анъанаҳои китобдории ниёгонамонро бо технологияҳои муосир пайваст намудем.
                </p>
                <p>
                  Мақсади мо на танҳо фурӯши китоб, балки эҳёи фарҳанги мутолиа ва дастрас намудани ганҷҳои маънавӣ ба ҳар як хонадони тоҷик мебошад.
                </p>
              </div>
              <div className="flex items-center gap-8 pt-6">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <img key={i} className="w-14 h-14 rounded-2xl border-4 border-white shadow-xl object-cover" src={`https://i.pravatar.cc/150?u=${i+20}`} alt=""/>
                  ))}
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border-4 border-white flex items-center justify-center text-white text-[10px] font-black shadow-xl">+5k</div>
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Зиёда аз 5000 мизоҷони доимӣ</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative animate-fade-up">
              <div className="absolute -inset-8 bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 rounded-[4rem] blur-3xl opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Library Atmosphere" 
                className="relative rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] w-full aspect-[4/3] object-cover ring-1 ring-slate-100"
              />
            </div>
          </section>

          {/* AI Advisor Section */}
          <section className="relative overflow-hidden bg-slate-950 rounded-[4rem] p-10 md:p-24 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)] animate-fade-up">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
               <div className="grid grid-cols-8 h-full">
                  {Array.from({length: 32}).map((_, i) => (
                    <div key={i} className="border-r border-b border-white/20"></div>
                  ))}
               </div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-12">
              <div className="w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl text-indigo-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.003l-.547-.547z" /></svg>
              </div>
              <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight font-heading">Китобдори рақамӣ</h3>
              <p className="text-slate-400 text-xl font-light tajik-text">Намедонед мутолиаро аз чӣ оғоз кунед? Таваҷҷӯҳ ё мавзӯи дилхоҳи худро нависед ва AZIZA AI ба шумо беҳтарин асарро пешниҳод мекунад.</p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <input 
                  type="text" 
                  placeholder="Масалан: Ман ба таърихи Сомониён ва ирфон таваҷҷӯҳ дорам..." 
                  className="flex-grow px-10 py-6 bg-white/5 border border-white/10 rounded-3xl text-white font-medium placeholder:text-slate-600 focus:ring-4 focus:ring-indigo-500/20 focus:bg-white/10 outline-none transition-all tajik-text text-lg"
                  value={interest}
                  onChange={e => setInterest(e.target.value)}
                />
                <button 
                  onClick={handleAskAI}
                  disabled={loading}
                  className="px-12 py-6 btn-gradient text-white font-black rounded-3xl hover:-translate-y-1 transition-all disabled:opacity-50 whitespace-nowrap shadow-2xl shadow-indigo-600/20 text-lg uppercase tracking-widest"
                >
                  {loading ? '...' : 'ПУРСИДАН'}
                </button>
              </div>

              {recommendation && (
                <div className="bg-white/[0.03] border border-indigo-500/20 p-12 rounded-[3rem] text-left animate-fade-up backdrop-blur-xl shadow-2xl">
                  <div className="flex items-start gap-8">
                    <span className="text-5xl">📖</span>
                    <div>
                      <h4 className="font-black text-indigo-400 uppercase tracking-[0.3em] text-[10px] mb-4">Тавсияи махсус</h4>
                      <p className="text-slate-100 text-2xl leading-relaxed italic font-heading tajik-text">{recommendation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Contact Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start animate-fade-up">
            <div className="bg-white p-16 rounded-[4rem] border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] space-y-12">
              <h3 className="text-4xl font-bold text-slate-900 tracking-tight font-heading">Тамос бо мо</h3>
              <div className="space-y-10">
                <div className="flex items-start gap-8 group">
                  <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Суроғаи мо</div>
                    <div className="text-2xl font-bold text-slate-900 font-heading">ш. Хуҷанд, кӯчаи Исмоили Сомонӣ 226</div>
                  </div>
                </div>
                <div className="flex items-start gap-8 group">
                  <div className="w-16 h-16 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-600 shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-all duration-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1.061A29 29 0 013 4.061V5z" /></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Телефон</div>
                    <div className="text-2xl font-bold text-slate-900 font-heading">+992 02 857 02 07</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-full min-h-[500px] rounded-[4rem] overflow-hidden shadow-2xl group border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Map View" 
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-all duration-700"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white/95 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] shadow-2xl text-center border border-white/50">
                   <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-3 animate-ping"></div>
                   <div className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">МАРКАЗИ ХУҶАНД</div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
