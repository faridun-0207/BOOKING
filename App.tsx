
import React, { useState, useEffect } from 'react';
import { Page, Book, CartItem, Order } from './types';
import { INITIAL_BOOKS } from './constants';
import Navbar from './components/Navbar';
import BookCatalog from './components/BookCatalog';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminPanel from './components/AdminPanel';
import AboutUs from './components/AboutUs';
import Hero from './components/Hero';
import OrderSuccess from './components/OrderSuccess';
import AzizaChat from './components/AzizaChat';
import { fetchBooks, fetchOrders, saveOrderToDb, updateOrderStatusInDb, saveBookToDb, deleteBookFromDb } from './services/supabaseService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Book[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastOrderId, setLastOrderId] = useState('');
  const [dbError, setDbError] = useState<string | null>(null);

  const loadData = async () => {
    setDbError(null);
    try {
      const dbBooks = await fetchBooks();
      let dbOrders: Order[] = [];
      try {
        dbOrders = await fetchOrders();
      } catch (e) {
        console.warn("Orders fetch failed:", e);
      }

      const missingBooks = INITIAL_BOOKS.filter(initial => 
        !dbBooks.find(db => db.id === initial.id)
      );

      if (missingBooks.length > 0) {
        for (const book of missingBooks) {
          try { await saveBookToDb(book); } catch (e) { console.error(e); }
        }
        const updatedDbBooks = await fetchBooks();
        setBooks(updatedDbBooks);
      } else if (dbBooks.length > 0) {
        setBooks(dbBooks);
      }
      setOrders(dbOrders);
    } catch (err: any) {
      if (err.message && err.message.includes('fetch')) setDbError(String(err));
    }
  };

  useEffect(() => {
    loadData();
    const savedCart = localStorage.getItem('kitobho_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedViewed = localStorage.getItem('kitobho_viewed');
    if (savedViewed) setRecentlyViewed(JSON.parse(savedViewed));
  }, []);

  useEffect(() => { localStorage.setItem('kitobho_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('kitobho_viewed', JSON.stringify(recentlyViewed)); }, [recentlyViewed]);

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) return prev.map(item => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const trackView = (book: Book) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(b => b.id !== book.id);
      return [book, ...filtered].slice(0, 5);
    });
  };

  const removeFromCart = (bookId: string) => setCart(prev => prev.filter(item => item.id !== bookId));
  const updateQuantity = (bookId: string, q: number) => {
    if (q <= 0) { removeFromCart(bookId); return; }
    setCart(prev => prev.map(item => item.id === bookId ? { ...item, quantity: q } : item));
  };

  const placeOrder = async (customerData: { name: string; phone: string; address: string }) => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = Math.random().toString(36).substr(2, 6).toUpperCase();
    const newOrder: Order = {
      id: orderId, customerName: customerData.name, phone: customerData.phone,
      address: customerData.address, items: [...cart], total, date: new Date().toISOString(), status: 'Нав'
    };
    try {
      await saveOrderToDb(newOrder);
      setOrders(prev => [newOrder, ...prev]);
      setCart([]);
      setLastOrderId(orderId);
      setCurrentPage('success');
    } catch (err: any) { alert(`Хатогии фармоиш: ${err.message}`); }
  };

  const handleAdminUpdateBook = async (updatedBook: Book) => {
    try {
      await saveBookToDb(updatedBook); // Сабт дар Supabase
      setBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b)); // Навсозии интерфейс
    } catch (err: any) { throw err; }
  };

  const handleAdminAddBook = async (newBook: Book) => {
    try {
      await saveBookToDb(newBook); // Сабт дар Supabase
      setBooks(prev => [newBook, ...prev]); // Навсозии интерфейс
    } catch (err: any) { throw err; }
  };

  const handleAdminDeleteBook = async (bookId: string) => {
    try {
      await deleteBookFromDb(bookId); // Ҳазф аз Supabase
      setBooks(prev => prev.filter(b => b.id !== bookId)); // Навсозии интерфейс
    } catch (err: any) { throw err; }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await updateOrderStatusInDb(orderId, status);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (err: any) { alert(`Хатогӣ: ${err.message}`); }
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onSearch={setSearchQuery} />
      <main className="flex-grow">
        <div className="animate-fade-up">
          {dbError && (
            <div className="bg-rose-50 border-b border-rose-100 p-4 text-center text-rose-800 text-xs font-bold shadow-inner">
              <div className="container mx-auto flex items-center justify-center gap-4">
                <span>Пайваст бо Supabase нест. Маълумоти аввалия нишон дода мешавад.</span>
                <button onClick={loadData} className="underline">Кӯшиши дубора</button>
              </div>
            </div>
          )}
          {(() => {
            switch (currentPage) {
              case 'home':
                return (
                  <>
                    <Hero onExplore={() => setCurrentPage('catalog')} />
                    <div className="container mx-auto px-4 py-12">
                      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 font-heading">Китобҳои навтарин</h2>
                      <BookCatalog books={books.slice(0, 4)} onAddToCart={addToCart} onViewBook={trackView} onSeeMore={() => setCurrentPage('catalog')} />
                    </div>
                  </>
                );
              case 'catalog':
                return (
                  <div className="container mx-auto px-4 py-12">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900 font-heading">Феҳристи китобҳо</h2>
                    <BookCatalog books={filteredBooks} onAddToCart={addToCart} onViewBook={trackView} recentlyViewed={recentlyViewed} showFilters />
                  </div>
                );
              case 'about': return <AboutUs />;
              case 'cart': return <Cart items={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onCheckout={() => setCurrentPage('checkout')} />;
              case 'checkout': return <Checkout cart={cart} onPlaceOrder={placeOrder} onBack={() => setCurrentPage('cart')} />;
              case 'success': return <OrderSuccess orderId={lastOrderId} onBackToHome={() => setCurrentPage('home')} />;
              case 'admin': return <AdminPanel books={books} orders={orders} onUpdateBook={handleAdminUpdateBook} onAddBook={handleAdminAddBook} onDeleteBook={handleAdminDeleteBook} onUpdateOrderStatus={handleUpdateOrderStatus} />;
              default: return <div>Саҳифа ёфт нашуд</div>;
            }
          })()}
        </div>
      </main>
      <AzizaChat />
      <footer className="bg-slate-900 text-white py-16 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-black">К</div>
              <h3 className="text-xl font-black">Китобхона</h3>
            </div>
            <p className="text-slate-400">Беҳтарин асарҳо дар маркази Хуҷанд.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-widest">Тамос</h3>
            <p className="text-slate-400">ш. Хуҷанд, Исмоили Сомонӣ 226</p>
            <p className="text-slate-400">+992 02 857 02 07</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
