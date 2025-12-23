
import { createClient } from '@supabase/supabase-js';
import { Book, Order } from '../types';

const SUPABASE_URL = 'https://juoxweoifnwxflpzrbyg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_-nOzOxzmjPNuoxIUSUI-EA_IEvCk1MY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const getErrorMessage = (error: any): string => {
  if (!error) return 'Хатогии номаълум';
  
  if (typeof error === 'string') return error;
  
  if (error instanceof TypeError && (error.message === 'Failed to fetch' || error.message.includes('fetch'))) {
    return "Пайвастшавӣ бо базаи додаҳо (Supabase) қатъ шуд. Лутфан пайвасти интернети худро тафтиш кунед ё боварӣ ҳосил кунед, ки URL-и база дуруст аст.";
  }

  // Handle Supabase error objects properly to avoid [object Object]
  const message = error.message || (error.error && error.error.message) || error.error_description || (typeof error === 'object' ? JSON.stringify(error) : String(error));
  const code = error.code ? ` [Код: ${error.code}]` : '';
  
  if (error.code === '42P01') return `Ҷадвал дар база ёфт нашуд. Лутфан ҷадвалҳои 'books' ва 'orders'-ро дар Supabase созед.${code}`;
  if (error.code === '42501') return `Иҷозати захира нест (RLS Error). Лутфан Row Level Security-ро дар Supabase танзим кунед.${code}`;
  
  return `${message}${code}`;
};

export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('books').select('id').limit(1);
    if (error) throw error;
    return { success: true, message: 'Пайвастшавӣ фаъол аст!' };
  } catch (err: any) {
    return { success: false, message: getErrorMessage(err) };
  }
};

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const { data, error } = await supabase.from('books').select('*').order('title');
    if (error) throw error;
    return data as Book[] || [];
  } catch (err) {
    const msg = getErrorMessage(err);
    console.error('[FetchBooks Error]:', msg);
    throw new Error(msg);
  }
};

export const saveBookToDb = async (book: Book) => {
  try {
    const { error } = await supabase.from('books').upsert(book);
    if (error) throw error;
    return true;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const saveOrderToDb = async (order: Order) => {
  try {
    const { error } = await supabase.from('orders').insert(order);
    if (error) throw error;
    return true;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase.from('orders').select('*').order('date', { ascending: false });
    if (error) throw error;
    return data as Order[] || [];
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
};

export const updateOrderStatusInDb = async (orderId: string, status: Order['status']) => {
  try {
    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
    if (error) throw error;
    return true;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const deleteBookFromDb = async (bookId: string) => {
  try {
    const { error } = await supabase.from('books').delete().eq('id', bookId);
    if (error) throw error;
    return true;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};
