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

  // PDF Organizer Tools
  {
    id: 'organize-pdf',
    name: 'Organize PDF',
    description: 'Sort and organize PDF pages automatically',
    icon: 'FileText',
    category: 'file',
    path: '/tools/file/organize-pdf'
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDFs',
    description: 'Combine multiple PDF files into one',
    icon: 'FilePlus',
    category: 'file',
    path: '/tools/file/merge-pdf',
    featured: true
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
    id: 'remove-pages',
    name: 'Remove Pages',
    description: 'Remove specific pages from PDF documents',
    icon: 'FileX',
    category: 'file',
    path: '/tools/file/remove-pages'
  },
  {
    id: 'extract-pages',
    name: 'Extract Pages',
    description: 'Extract specific pages from PDF documents',
    icon: 'FileUp',
    category: 'file',
    path: '/tools/file/extract-pages'
  },
  {
    id: 'scan-to-pdf',
    name: 'Scan to PDF',
    description: 'Convert scanned images to searchable PDF',
    icon: 'FileUp',
    category: 'file',
    path: '/tools/file/scan-to-pdf'
  },
  {
    id: 'optimize-pdf',
    name: 'Optimize PDF',
    description: 'Optimize PDF files for better performance',
    icon: 'Zap',
    category: 'file',
    path: '/tools/file/optimize-pdf'
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDFs',
    description: 'Reduce PDF file size while maintaining quality',
    icon: 'Archive',
    category: 'file',
    path: '/tools/file/compress-pdf',
    featured: true
  },
  {
    id: 'repair-pdf',
    name: 'Repair PDF',
    description: 'Fix corrupted or damaged PDF files',
    icon: 'Wrench',
    category: 'file',
    path: '/tools/file/repair-pdf'
  },
  {
    id: 'ocr-pdf',
    name: 'OCR PDF',
    description: 'Extract text from scanned PDF documents',
    icon: 'Search',
    category: 'file',
    path: '/tools/file/ocr-pdf'
  },

  // Convert to PDF Tools
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert JPG images to PDF documents',
    icon: 'Image',
    category: 'file',
    path: '/tools/file/image-to-pdf'
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Convert Word documents to PDF format',
    icon: 'FileText',
    category: 'file',
    path: '/tools/file/word-to-pdf'
  },
  {
    id: 'powerpoint-to-pdf',
    name: 'PowerPoint to PDF',
    description: 'Convert PowerPoint presentations to PDF',
    icon: 'Presentation',
    category: 'file',
    path: '/tools/file/powerpoint-to-pdf'
  },
  {
    id: 'excel-to-pdf',
    name: 'Excel to PDF',
    description: 'Convert Excel spreadsheets to PDF format',
    icon: 'Table',
    category: 'file',
    path: '/tools/file/excel-to-pdf'
  },
  {
    id: 'html-to-pdf',
    name: 'HTML to PDF',
    description: 'Convert HTML files to PDF documents',
    icon: 'Code',
    category: 'file',
    path: '/tools/file/html-to-pdf'
  },

  // Convert from PDF Tools
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Convert PDF pages to JPG images',
    icon: 'Image',
    category: 'file',
    path: '/tools/file/pdf-to-jpg'
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert PDF documents to Word format',
    icon: 'FileText',
    category: 'file',
    path: '/tools/file/pdf-to-word'
  },
  {
    id: 'pdf-to-powerpoint',
    name: 'PDF to PowerPoint',
    description: 'Convert PDF to PowerPoint presentation',
    icon: 'Presentation',
    category: 'file',
    path: '/tools/file/pdf-to-powerpoint'
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to Excel',
    description: 'Convert PDF tables to Excel spreadsheets',
    icon: 'Table',
    category: 'file',
    path: '/tools/file/pdf-to-excel'
  },
  {
    id: 'pdf-to-pdfa',
    name: 'PDF to PDF/A',
    description: 'Convert PDF to PDF/A format for archiving',
    icon: 'Archive',
    category: 'file',
    path: '/tools/file/pdf-to-pdfa'
  },

  // Edit PDF Tools
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF',
    description: 'Rotate PDF pages to correct orientation',
    icon: 'RotateCcw',
    category: 'file',
    path: '/tools/file/rotate-pdf'
  },
  {
    id: 'add-page-numbers',
    name: 'Add Page Numbers',
    description: 'Add page numbers to PDF documents',
    icon: 'Hash',
    category: 'file',
    path: '/tools/file/add-page-numbers'
  },
  {
    id: 'watermark-pdf',
    name: 'Add Watermark',
    description: 'Add watermarks to PDF documents',
    icon: 'Stamp',
    category: 'file',
    path: '/tools/file/watermark-pdf'
  },
  {
    id: 'crop-pdf',
    name: 'Crop PDF',
    description: 'Crop PDF pages to remove unwanted areas',
    icon: 'Crop',
    category: 'file',
    path: '/tools/file/crop-pdf'
  },
  {
    id: 'edit-pdf',
    name: 'Edit PDF',
    description: 'Add text, highlights, and drawings to PDF',
    icon: 'Edit',
    category: 'file',
    path: '/tools/file/edit-pdf'
  },

  // PDF Security Tools
  {
    id: 'unlock-pdf',
    name: 'Unlock PDF',
    description: 'Remove password protection from PDF files',
    icon: 'Unlock',
    category: 'file',
    path: '/tools/file/unlock-pdf'
  },
  {
    id: 'pdf-password',
    name: 'Protect PDF',
    description: 'Add password protection to PDF files',
    icon: 'Lock',
    category: 'file',
    path: '/tools/file/pdf-password',
    featured: true
  },
  {
    id: 'sign-pdf',
    name: 'Sign PDF',
    description: 'Add digital signatures to PDF documents',
    icon: 'PenTool',
    category: 'file',
    path: '/tools/file/sign-pdf'
  },
  {
    id: 'redact-pdf',
    name: 'Redact PDF',
    description: 'Remove sensitive information from PDF files',
    icon: 'EyeOff',
    category: 'file',
    path: '/tools/file/redact-pdf'
  },
  {
    id: 'compare-pdf',
    name: 'Compare PDF',
    description: 'Compare two PDF documents for differences',
    icon: 'GitCompare',
    category: 'file',
    path: '/tools/file/compare-pdf'
  },

  // Other File Tools
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
