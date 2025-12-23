
import React from 'react';

interface OrderSuccessProps {
  orderId: string;
  onBackToHome: () => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ orderId, onBackToHome }) => {
  return (
    <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
      <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-xl border border-green-100">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Табрик!</h2>
        <p className="text-xl text-gray-600 mb-2">Фармоиши шумо бо муваффақият қабул шуд.</p>
        <p className="text-indigo-600 font-bold mb-8 text-lg">Рақами фармоиш: #{orderId}</p>
        
        <div className="bg-gray-50 p-4 rounded-xl mb-8 text-sm text-gray-500 leading-relaxed text-left">
          <p>• Мо дар давоми 15 дақиқа бо шумо тамос мегирем.</p>
          <p>• Паёми тасдиқ ба телефони шумо фиристода шуд.</p>
          <p>• Интиқол дар давоми рӯз анҷом дода мешавад.</p>
        </div>
        
        <button 
          onClick={onBackToHome}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg"
        >
          Бозгашт ба саҳифаи асосӣ
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
