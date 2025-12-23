
import React, { useState, useMemo, useEffect } from 'react';
import { Book, Order, Category } from '../types';
import { generateBookCover } from '../services/geminiService';
import { testSupabaseConnection } from '../services/supabaseService';

interface AdminPanelProps {
  books: Book[];
  orders: Order[];
  onUpdateBook: (b: Book) => Promise<void>; // Тағйир ба Promise
  onAddBook: (b: Book) => Promise<void>;    // Тағйир ба Promise
  onDeleteBook: (id: string) => Promise<void>;
  onUpdateOrderStatus: (id: string, status: Order['status']) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  books, 
  orders, 
  onUpdateBook, 
  onAddBook, 
  onDeleteBook, 
  onUpdateOrderStatus 
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [tab, setTab] = useState<'orders' | 'books'>('orders');
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [adminSearch, setAdminSearch] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [connStatus, setConnStatus] = useState<{ checked: boolean, ok: boolean, msg: string }>({ checked: false, ok: false, msg: '' });

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Book>>({
    title: '', author: '', price: 0, category: 'Адабиёт', description: '', stock: 10, coverImage: ''
  });

  useEffect(() => {
    if (isLoggedIn) checkConn();
  }, [isLoggedIn]);

  const checkConn = async () => {
    const res = await testSupabaseConnection();
    setConnStatus({ checked: true, ok: res.success, msg: res.message });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'AZIZA') {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const openAddForm = () => {
    setEditingBook(null);
    setFormData({ title: '', author: '', price: 0, category: 'Адабиёт', description: '', stock: 10, coverImage: '' });
    setShowForm(true);
    setErrorMsg('');
  };

  const openEditForm = (book: Book) => {
    setEditingBook(book);
    setFormData({ ...book });
    setShowForm(true);
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsProcessing(true);
    let currentCoverImage = formData.coverImage;
    
    try {
      // AI Image Generation if needed
      if (!currentCoverImage || currentCoverImage.trim() === '') {
        setGenerationStep('AI: Тавлиди муқова...');
        const generated = await generateBookCover(formData.title || '', formData.author || '');
        if (generated) {
          currentCoverImage = generated;
        } else {
          throw new Error('Хатогӣ дар тавлиди муқоваи AI.');
        }
      }

      setGenerationStep('Захира дар Supabase...');
      const bookData = { ...formData, coverImage: currentCoverImage } as Book;
      
      if (editingBook) {
        await onUpdateBook({ ...editingBook, ...bookData });
        setSuccessMessage('Тағйирот дар база сабт шуд!');
      } else {
        await onAddBook({ ...bookData, id: Math.random().toString(36).substr(2, 9) });
        setSuccessMessage('Китоби нав ба база илова шуд!');
      }
      
      setShowForm(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Хатогии техникӣ ҳангоми сабт.');
    } finally {
      setIsProcessing(false);
      setGenerationStep('');
    }
  };

  const executeDelete = async () => {
    if (deletingId) {
      try {
        setIsProcessing(true);
        await onDeleteBook(deletingId);
        setDeletingId(null);
        setSuccessMessage('Китоб аз база ҳазф шуд.');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err: any) {
        setErrorMsg('Хатогӣ ҳангоми ҳазф.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const filteredAdminBooks = useMemo(() => {
    return books.filter(b => 
      b.title.toLowerCase().includes(adminSearch.toLowerCase()) || 
      b.author.toLowerCase().includes(adminSearch.toLowerCase())
    );
  }, [books, adminSearch]);

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-32 flex justify-center animate-fade-up">
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-indigo-100">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Панели Маъмурӣ</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-8">
            <input 
              type="password" 
              className={`w-full px-6 py-5 bg-slate-50 border-2 rounded-2xl text-center text-3xl tracking-[0.6em] outline-none transition-all ${loginError ? 'border-red-500 animate-shake' : 'border-slate-100'}`}
              placeholder="••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full py-5 btn-gradient text-white font-black rounded-2xl shadow-xl shadow-indigo-200 text-lg">Ворид шудан</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-up">
      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-md w-full animate-fade-up border border-slate-100">
            <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center text-rose-600 mx-auto mb-8">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 text-center mb-4">Тасдиқи ҳазф</h3>
            <p className="text-slate-500 text-center font-bold mb-10">Оё шумо мутмаин ҳастед, ки ин китобро аз базаи додаҳо (Supabase) тоза кардан мехоҳед?</p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setDeletingId(null)} className="py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all text-sm uppercase">Бекор кардан</button>
              <button onClick={executeDelete} disabled={isProcessing} className="py-4 bg-rose-600 text-white font-black rounded-2xl hover:bg-rose-700 transition-all text-sm uppercase shadow-xl disabled:opacity-50">ҲАЗФ КАРДАН</button>
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Notifications */}
      {successMessage && <div className="fixed top-24 right-6 bg-emerald-600 text-white px-8 py-5 rounded-2xl shadow-2xl z-[100] animate-bounce font-black">{successMessage}</div>}
      {errorMsg && <div className="fixed top-24 right-6 bg-rose-600 text-white px-8 py-5 rounded-2xl shadow-2xl z-[100] animate-pulse font-black">{errorMsg}</div>}

      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-8 gap-8">
        <div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-3 font-heading">Идоракунии мағоза</h2>
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${connStatus.ok ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
             <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Supabase: {connStatus.ok ? 'Пайваст' : 'Хатогии пайваст'}</p>
          </div>
        </div>
        <div className="flex p-1.5 bg-slate-100 rounded-[1.5rem] shadow-inner">
          <button onClick={() => setTab('orders')} className={`px-8 py-3 rounded-2xl transition-all font-black text-sm ${tab === 'orders' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500'}`}>ФАРМОИШҲО</button>
          <button onClick={() => setTab('books')} className={`px-8 py-3 rounded-2xl transition-all font-black text-sm ${tab === 'books' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500'}`}>КИТОБҲО</button>
        </div>
      </div>

      {tab === 'books' ? (
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
            <div className="relative w-full md:w-[32rem]">
              <input 
                type="text" 
                placeholder="Ҷустуҷӯ дар база..." 
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-lg font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                value={adminSearch} 
                onChange={e => setAdminSearch(e.target.value)} 
              />
              <svg className="w-6 h-6 absolute left-5 top-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <button onClick={openAddForm} className="px-10 py-4 btn-gradient text-white rounded-2xl font-black text-lg flex items-center gap-4 w-full md:w-auto justify-center shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
              ИЛОВАИ КИТОБ
            </button>
          </div>

          {showForm && (
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border-t-8 border-indigo-600 shadow-2xl animate-fade-up">
              <h3 className="text-2xl font-black text-slate-900 mb-10 uppercase font-heading">{editingBook ? 'Таҳрири маълумот' : 'Иловаи китоби нав'}</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="field-label">Номи асар</label>
                    <input type="text" className="input-premium w-full px-6 py-4 rounded-2xl font-bold" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="field-label">Муаллиф</label>
                    <input type="text" className="input-premium w-full px-6 py-4 rounded-2xl font-bold" required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="field-label">Нарх (смн)</label>
                    <input type="number" className="input-premium w-full px-6 py-4 rounded-2xl font-bold" required value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <label className="field-label">Категория</label>
                    <select className="input-premium w-full px-6 py-4 rounded-2xl font-bold" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as Category})}>
                      {['Адабиёт', 'Таърих', 'Илм', 'Бачагона', 'Психология'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="field-label">URL-и муқова (холӣ = AI тавлид мекунад)</label>
                    <input type="text" className="input-premium w-full px-6 py-4 rounded-2xl font-bold" value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-8 border-t">
                  <button type="button" onClick={() => setShowForm(false)} className="px-10 py-4 text-slate-400 font-black uppercase text-sm">Бекор кардан</button>
                  <button type="submit" disabled={isProcessing} className="px-14 py-4 btn-gradient text-white rounded-2xl font-black text-lg disabled:opacity-50 min-w-[300px] flex items-center justify-center gap-3">
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {generationStep}
                      </>
                    ) : (editingBook ? 'ЗАХИРАИ ТАҒЙИРОТ' : 'ИЛОВА БА БАЗА')}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b">
                    <th className="px-10 py-7 text-left text-xs font-black text-slate-400 uppercase tracking-widest">КИТОБ</th>
                    <th className="px-10 py-7 text-left text-xs font-black text-slate-400 uppercase tracking-widest">КАТЕГОРИЯ</th>
                    <th className="px-10 py-7 text-left text-xs font-black text-slate-400 uppercase tracking-widest">НАРХ</th>
                    <th className="px-10 py-7 text-right text-xs font-black text-slate-400 uppercase tracking-widest">АМАЛИЁТ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredAdminBooks.map(book => (
                    <tr key={book.id} className="hover:bg-slate-50/80 transition-all group">
                      <td className="px-10 py-7 flex items-center gap-6">
                        <div className="w-16 h-24 rounded-xl overflow-hidden shadow-lg bg-slate-50">
                          <img src={book.coverImage} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                          <div className="font-black text-slate-900 text-xl font-heading">{book.title}</div>
                          <div className="text-slate-400 font-bold text-sm">{book.author}</div>
                        </div>
                      </td>
                      <td className="px-10 py-7">
                        <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full font-black text-[10px] uppercase tracking-widest">{book.category}</span>
                      </td>
                      <td className="px-10 py-7 font-black text-slate-900 text-2xl font-heading">
                        {book.price} <span className="text-xs font-bold text-slate-400 uppercase">смн</span>
                      </td>
                      <td className="px-10 py-7 text-right">
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => openEditForm(book)} 
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all font-black text-xs uppercase"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            Таҳрир
                          </button>
                          <button 
                            onClick={() => setDeletingId(book.id)} 
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border text-rose-500 rounded-xl hover:bg-rose-600 hover:text-white transition-all font-black text-xs uppercase"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            Ҳазф
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-x-auto">
          {/* Orders logic here... */}
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b">
                <th className="px-10 py-7 text-left text-xs font-black text-slate-400 uppercase tracking-widest">ID ФАРМОИШ</th>
                <th className="px-10 py-7 text-left text-xs font-black text-slate-400 uppercase tracking-widest">МИЗОҶ</th>
                <th className="px-10 py-7 text-left text-xs font-black text-slate-400 uppercase tracking-widest">ҲОЛАТ</th>
                <th className="px-10 py-7 text-right text-xs font-black text-slate-400 uppercase tracking-widest">АМАЛ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-all">
                  <td className="px-10 py-7 font-black text-indigo-600">#{order.id}</td>
                  <td className="px-10 py-7 font-bold text-slate-900">{order.customerName}</td>
                  <td className="px-10 py-7">
                    <span className={`px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest ${order.status === 'Нав' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <select className="bg-slate-100 rounded-xl px-4 py-2 font-black text-[10px] outline-none" value={order.status} onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}>
                      <option value="Нав">НАВ</option>
                      <option value="Дар раванд">ДАР РАВАНД</option>
                      <option value="Иҷрошуда">ИҶРОШУДА</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
