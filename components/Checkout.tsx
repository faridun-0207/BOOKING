
import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onPlaceOrder: (data: { name: string; phone: string; address: string }) => void;
  onBack: () => void;
}

type ProcessingStep = 'idle' | 'preparing' | 'validating' | 'reserving' | 'finalizing';

const Checkout: React.FC<CheckoutProps> = ({ cart, onPlaceOrder, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [processingStep, setProcessingStep] = useState<ProcessingStep>('idle');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const steps: { key: ProcessingStep; label: string; icon: React.ReactNode }[] = [
    { 
      key: 'preparing', 
      label: 'Омодасозии маълумот...', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> 
    },
    { 
      key: 'validating', 
      label: 'Санҷиши суроға ва алоқа...', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> 
    },
    { 
      key: 'reserving', 
      label: 'Банд кардани китобҳо дар анбор...', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> 
    },
    { 
      key: 'finalizing', 
      label: 'Бақайдгирии фармоиш...', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> 
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Лутфан ҳамаи майдонҳоро пур кунед.');
      return;
    }

    startSimulation();
  };

  const startSimulation = async () => {
    setProcessingStep('preparing');
    await new Promise(r => setTimeout(r, 1200));
    
    setProcessingStep('validating');
    await new Promise(r => setTimeout(r, 1500));
    
    setProcessingStep('reserving');
    await new Promise(r => setTimeout(r, 1800));
    
    setProcessingStep('finalizing');
    await new Promise(r => setTimeout(r, 1000));
    
    onPlaceOrder(formData);
  };

  const currentStepIndex = steps.findIndex(s => s.key === processingStep);

  if (processingStep !== 'idle') {
    return (
      <div className="container mx-auto px-4 py-32 flex justify-center items-center min-h-[70vh] animate-fade-up">
        <div className="w-full max-w-2xl bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-slate-100">
             <div 
               className="h-full bg-indigo-600 transition-all duration-1000 ease-out"
               style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
             ></div>
          </div>
          
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-indigo-600 relative">
              <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-[2rem] animate-spin"></div>
              {steps[currentStepIndex]?.icon}
            </div>
            <h2 className="text-4xl font-black text-slate-900 font-heading mb-4 tracking-tight">Коркарди фармоиш</h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Лутфан саҳифаро набандед</p>
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isActive = idx === currentStepIndex;
              
              return (
                <div 
                  key={step.key} 
                  className={`flex items-center gap-6 p-6 rounded-3xl border-2 transition-all duration-500 ${
                    isActive ? 'border-indigo-600 bg-indigo-50/30 scale-[1.02]' : 
                    isCompleted ? 'border-emerald-100 bg-emerald-50/30' : 
                    'border-slate-50 opacity-40'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isCompleted ? 'bg-emerald-500 text-white' : 
                    isActive ? 'bg-indigo-600 text-white animate-pulse' : 
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {isCompleted ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <span className="font-black text-sm">{idx + 1}</span>
                    )}
                  </div>
                  <span className={`text-lg font-black tracking-tight tajik-text ${isActive ? 'text-indigo-900' : isCompleted ? 'text-emerald-900' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between items-center px-4">
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ҷамъи пардохт</span>
                <span className="text-2xl font-black text-slate-900">{total} смн.</span>
             </div>
             <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">
                Secure SSL Transaction
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl animate-fade-up">
      <button 
        onClick={onBack}
        className="flex items-center gap-3 text-indigo-600 hover:text-indigo-800 transition-all mb-12 font-black text-sm uppercase tracking-widest group"
      >
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        Бозгашт ба сабад
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-7">
          <h2 className="text-4xl font-black text-slate-900 mb-10 tracking-tight font-heading">Маълумоти интиқол</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="field-label">Ному насаб</label>
              <input 
                type="text" 
                className="w-full px-6 py-5 bg-slate-800 border-none rounded-[1.5rem] text-white font-bold text-lg focus:ring-4 focus:ring-indigo-500/30 outline-none transition-all placeholder:text-slate-400"
                placeholder="ФАРМОИШГАР"
                value={formData.name}
                required
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="field-label">Рақами телефон</label>
              <input 
                type="tel" 
                className="w-full px-6 py-5 bg-slate-800 border-none rounded-[1.5rem] text-white font-bold text-lg focus:ring-4 focus:ring-indigo-500/30 outline-none transition-all placeholder:text-slate-400"
                placeholder="+992 9XX XX XX XX"
                value={formData.phone}
                required
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="field-label">Нишонӣ (Адрес)</label>
              <textarea 
                className="w-full px-6 py-5 bg-slate-800 border-none rounded-[1.5rem] text-white font-bold text-lg focus:ring-4 focus:ring-indigo-500/30 outline-none transition-all placeholder:text-slate-400 resize-none"
                rows={4}
                placeholder="ш. Хуҷанд, маҳаллаи..."
                value={formData.address}
                required
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
            
            <div className="pt-8 space-y-4">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Тарзи пардохт</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative flex items-center gap-4 p-6 bg-white border-2 border-indigo-600 rounded-[1.5rem] cursor-pointer shadow-xl shadow-indigo-50 transition-all">
                  <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                  <div className="flex flex-col">
                    <span className="font-black text-slate-900 text-sm">Ҳангоми қабул (Нақдӣ)</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Пардохти мустақим</span>
                  </div>
                </label>
                <label className="relative flex items-center gap-4 p-6 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] cursor-not-allowed opacity-60">
                  <input type="radio" name="payment" disabled className="w-5 h-5 text-slate-400" />
                  <div className="flex flex-col">
                    <span className="font-black text-slate-500 text-sm">Корти бонкӣ</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Ба наздикӣ фаъол мешавад</span>
                  </div>
                </label>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-emerald-500 text-white font-black rounded-[2rem] hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-200 mt-10 text-xl tracking-tight active:scale-[0.98]"
            >
              Тасдиқи фармоиш - {total} смн.
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl h-fit sticky top-32">
          <h3 className="text-2xl font-black text-slate-900 mb-8 font-heading tracking-tight">Хулосаи фармоиш</h3>
          <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center group">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xs font-black text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {item.quantity}
                  </div>
                  <div className="min-w-0">
                    <span className="text-slate-700 font-bold block truncate w-48 font-heading">{item.title}</span>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.author}</span>
                  </div>
                </div>
                <span className="font-black text-slate-900 whitespace-nowrap">{item.price * item.quantity} смн.</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-4 pt-8 border-t border-slate-50">
            <div className="flex justify-between text-slate-500 font-bold text-sm">
              <span>Арзиши китобҳо:</span>
              <span className="text-slate-900">{total} смн.</span>
            </div>
            <div className="flex justify-between text-slate-500 font-bold text-sm">
              <span>Интиқол:</span>
              <span className="text-emerald-500">0 смн.</span>
            </div>
            <div className="flex justify-between items-end pt-4">
              <span className="text-2xl font-black text-slate-900 font-heading">Ҷамъ:</span>
              <span className="text-4xl font-black text-indigo-600 font-heading">{total} смн.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
