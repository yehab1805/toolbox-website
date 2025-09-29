export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'study' | 'business' | 'file' | 'fun' | 'utility';
  path: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  tools: Tool[];
}

export interface Grade {
  subject: string;
  grade: string;
  credits: number;
}

export interface Citation {
  type: 'book' | 'article' | 'website' | 'journal';
  title: string;
  author: string;
  year: string;
  publisher?: string;
  url?: string;
  volume?: string;
  issue?: string;
  pages?: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category?: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  companyName: string;
  companyAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  date: string;
  dueDate: string;
}
