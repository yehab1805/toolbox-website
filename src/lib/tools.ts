import { Tool, Category } from '@/types';

export const tools: Tool[] = [
  // Study & Education Tools
  {
    id: 'gpa-calculator',
    name: 'GPA Calculator',
    description: 'Calculate your GPA with weighted and unweighted scales',
    icon: 'Calculator',
    category: 'study',
    path: '/tools/study/gpa-calculator',
    featured: true
  },
  {
    id: 'grade-calculator',
    name: 'Grade Calculator',
    description: 'IGCSE / SAT grade calculator with multiple scales',
    icon: 'GraduationCap',
    category: 'study',
    path: '/tools/study/grade-calculator'
  },
  {
    id: 'citation-generator',
    name: 'Citation Generator',
    description: 'Generate APA, MLA, and Harvard citations',
    icon: 'FileText',
    category: 'study',
    path: '/tools/study/citation-generator'
  },
  {
    id: 'flashcard-maker',
    name: 'Flashcard Maker',
    description: 'Create and export flashcards for studying',
    icon: 'CreditCard',
    category: 'study',
    path: '/tools/study/flashcard-maker'
  },
  {
    id: 'math-solver',
    name: 'Math Solver',
    description: 'Simple rule-based math problem solver',
    icon: 'FunctionSquare',
    category: 'study',
    path: '/tools/study/math-solver'
  },

  // Business & Productivity Tools
  {
    id: 'invoice-generator',
    name: 'Invoice Generator',
    description: 'Create professional invoices and export to PDF',
    icon: 'Receipt',
    category: 'business',
    path: '/tools/business/invoice-generator',
    featured: true
  },
  {
    id: 'todo-list',
    name: 'To-Do List',
    description: 'Organize tasks with priority levels and notes',
    icon: 'CheckSquare',
    category: 'business',
    path: '/tools/business/todo-list'
  },
  {
    id: 'expense-tracker',
    name: 'Expense Tracker',
    description: 'Track your expenses with categories and reports',
    icon: 'TrendingUp',
    category: 'business',
    path: '/tools/business/expense-tracker'
  },
  {
    id: 'text-to-pdf',
    name: 'Text/CSV to PDF',
    description: 'Convert text files and CSV data to PDF format',
    icon: 'FileDown',
    category: 'business',
    path: '/tools/business/text-to-pdf'
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, and contact info',
    icon: 'QrCode',
    category: 'business',
    path: '/tools/business/qr-generator'
  },

  // File & Document Tools
  {
    id: 'merge-pdf',
    name: 'Merge PDFs',
    description: 'Combine multiple PDF files into one',
    icon: 'FilePlus',
    category: 'file',
    path: '/tools/file/merge-pdf'
  },
  {
    id: 'split-pdf',
    name: 'Split PDFs',
    description: 'Split PDF files into separate pages',
    icon: 'FileMinus',
    category: 'file',
    path: '/tools/file/split-pdf'
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDFs',
    description: 'Reduce PDF file size while maintaining quality',
    icon: 'Archive',
    category: 'file',
    path: '/tools/file/compress-pdf'
  },
  {
    id: 'pdf-password',
    name: 'PDF Password',
    description: 'Add or remove passwords from PDF files',
    icon: 'Lock',
    category: 'file',
    path: '/tools/file/pdf-password'
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    description: 'Convert between JPG, PNG, and WebP formats',
    icon: 'Image',
    category: 'file',
    path: '/tools/file/image-converter'
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize and crop images to any dimensions',
    icon: 'Maximize',
    category: 'file',
    path: '/tools/file/image-resizer'
  },
  {
    id: 'video-compressor',
    name: 'Video Compressor',
    description: 'Compress video files to reduce size',
    icon: 'Video',
    category: 'file',
    path: '/tools/file/video-compressor'
  },

  // Fun & Creative Tools
  {
    id: 'meme-generator',
    name: 'Meme Generator',
    description: 'Create memes by adding text to images',
    icon: 'Smile',
    category: 'fun',
    path: '/tools/fun/meme-generator',
    featured: true
  },
  {
    id: 'name-generator',
    name: 'Random Name Generator',
    description: 'Generate baby names, Wi-Fi names, and startup names',
    icon: 'Users',
    category: 'fun',
    path: '/tools/fun/name-generator'
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure random passwords',
    icon: 'Key',
    category: 'fun',
    path: '/tools/fun/password-generator'
  },
  {
    id: 'idea-generator',
    name: 'Random Idea Generator',
    description: 'Get random ideas for recipes, workouts, and study plans',
    icon: 'Lightbulb',
    category: 'fun',
    path: '/tools/fun/idea-generator'
  },

  // Utility & Everyday Tools
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement',
    icon: 'Ruler',
    category: 'utility',
    path: '/tools/utility/unit-converter'
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between different currencies',
    icon: 'DollarSign',
    category: 'utility',
    path: '/tools/utility/currency-converter'
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Calculate mortgage and loan payments',
    icon: 'Home',
    category: 'utility',
    path: '/tools/utility/mortgage-calculator'
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index and health metrics',
    icon: 'Activity',
    category: 'utility',
    path: '/tools/utility/bmi-calculator'
  },
  {
    id: 'calorie-calculator',
    name: 'Calorie Calculator',
    description: 'Calculate daily calorie needs and burn rates',
    icon: 'Zap',
    category: 'utility',
    path: '/tools/utility/calorie-calculator'
  }
];

export const categories: Category[] = [
  {
    id: 'study',
    name: 'Study & Education',
    description: 'Tools to help with studying and academic work',
    icon: 'BookOpen',
    color: 'blue',
    tools: tools.filter(tool => tool.category === 'study')
  },
  {
    id: 'business',
    name: 'Business & Productivity',
    description: 'Tools for work and productivity',
    icon: 'Briefcase',
    color: 'green',
    tools: tools.filter(tool => tool.category === 'business')
  },
  {
    id: 'file',
    name: 'File & Document',
    description: 'File processing and document tools',
    icon: 'File',
    color: 'purple',
    tools: tools.filter(tool => tool.category === 'file')
  },
  {
    id: 'fun',
    name: 'Fun & Creative',
    description: 'Creative and entertaining tools',
    icon: 'Heart',
    color: 'pink',
    tools: tools.filter(tool => tool.category === 'fun')
  },
  {
    id: 'utility',
    name: 'Utility & Everyday',
    description: 'Daily utility and conversion tools',
    icon: 'Settings',
    color: 'orange',
    tools: tools.filter(tool => tool.category === 'utility')
  }
];

export const featuredTools = tools.filter(tool => tool.featured);
