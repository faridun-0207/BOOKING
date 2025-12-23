
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Сабади харид холӣ аст</h2>
        <p className="text-gray-500 mb-8">Ба феҳрист равед ва чанд китоби ҷолибро интихоб кунед.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Сабади харид</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl border shadow-sm">
              <img src={item.coverImage} alt={item.title} className="w-24 h-32 object-cover rounded" />
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">{item.author}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border rounded-lg">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50 text-gray-500"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50 text-gray-500"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <span className="font-bold">{item.price * item.quantity} смн.</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm h-fit space-y-4">
          <h3 className="text-xl font-bold border-b pb-4">Маълумоти фармоиш</h3>
          <div className="flex justify-between text-gray-600">
            <span>Миқдори китобҳо:</span>
            <span>{items.reduce((s, i) => s + i.quantity, 0)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Интиқол:</span>
            <span className="text-green-600 font-medium">Бепул</span>
          </div>
          <div className="border-t pt-4 flex justify-between text-xl font-bold">
            <span>Ҷамъ:</span>
            <span>{total} смн.</span>
          </div>
          <button 
            onClick={onCheckout}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg mt-4"
          >
            Ба расмият даровардан
          </button>
          <p className="text-xs text-center text-gray-400">
            Бо пахш кардани тугма шумо шартҳои истифодабариро қабул мекунед.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
