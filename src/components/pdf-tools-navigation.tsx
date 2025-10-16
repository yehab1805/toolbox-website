"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  FilePlus, 
  FileMinus, 
  Archive, 
  Lock, 
  RotateCcw, 
  Hash, 
  Stamp, 
  Image, 
  FileText,
  FileUp,
  FileX,
  Unlock,
  PenTool,
  EyeOff,
  GitCompare,
  Zap,
  Wrench,
  Search,
  Crop,
  Edit,
  Presentation,
  Table,
  Code
} from 'lucide-react';

const pdfTools = [
  // PDF Organizer Tools
  {
    id: 'merge-pdf',
    name: 'Merge PDFs',
    description: 'Combine multiple PDF files into one',
    icon: FilePlus,
    path: '/tools/file/merge-pdf',
    category: 'Organizer'
  },
  {
    id: 'split-pdf',
    name: 'Split PDFs',
    description: 'Split PDF files into separate pages',
    icon: FileMinus,
    path: '/tools/file/split-pdf',
    category: 'Organizer'
  },
  {
    id: 'remove-pages',
    name: 'Remove Pages',
    description: 'Remove specific pages from PDF documents',
    icon: FileX,
    path: '/tools/file/remove-pages',
    category: 'Organizer'
  },
  {
    id: 'extract-pages',
    name: 'Extract Pages',
    description: 'Extract specific pages from PDF documents',
    icon: FileUp,
    path: '/tools/file/extract-pages',
    category: 'Organizer'
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDFs',
    description: 'Reduce PDF file size while maintaining quality',
    icon: Archive,
    path: '/tools/file/compress-pdf',
    category: 'Organizer'
  },

  // Convert to PDF Tools
  {
    id: 'image-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert JPG, PNG, and other images to PDF',
    icon: Image,
    path: '/tools/file/image-to-pdf',
    category: 'Convert to PDF'
  },

  // Convert from PDF Tools
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Convert PDF pages to JPG images',
    icon: Image,
    path: '/tools/file/pdf-to-jpg',
    category: 'Convert from PDF'
  },

  // Edit PDF Tools
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF',
    description: 'Rotate PDF pages to correct orientation',
    icon: RotateCcw,
    path: '/tools/file/rotate-pdf',
    category: 'Edit PDF'
  },
  {
    id: 'add-page-numbers',
    name: 'Add Page Numbers',
    description: 'Add page numbers to PDF documents',
    icon: Hash,
    path: '/tools/file/add-page-numbers',
    category: 'Edit PDF'
  },
  {
    id: 'watermark-pdf',
    name: 'Add Watermark',
    description: 'Add watermarks to PDF documents',
    icon: Stamp,
    path: '/tools/file/watermark-pdf',
    category: 'Edit PDF'
  },

  // PDF Security Tools
  {
    id: 'pdf-password',
    name: 'PDF Password',
    description: 'Add or remove password protection',
    icon: Lock,
    path: '/tools/file/pdf-password',
    category: 'Security'
  },
];

const categoryIcons = {
  'Organizer': FilePlus,
  'Convert to PDF': Image,
  'Convert from PDF': FileText,
  'Edit PDF': Edit,
  'Security': Lock,
};

export default function PDFToolsNavigation() {
  const categories = [...new Set(pdfTools.map(tool => tool.category))];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Complete PDF Toolkit</h2>
        <p className="text-muted-foreground text-lg">
          All the PDF tools you need in one place. Free, secure, and easy to use.
        </p>
      </div>

      <div className="grid gap-8">
        {categories.map((category) => {
          const categoryTools = pdfTools.filter(tool => tool.category === category);
          const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];

          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-4">
                <CategoryIcon className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">{category}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTools.map((tool) => {
                  const IconComponent = tool.icon;
                  
                  return (
                    <Card key={tool.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconComponent className="h-5 w-5 text-primary" />
                          {tool.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link href={tool.path}>
                            Use Tool
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Why Choose Our PDF Tools?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">🔒</span>
                </div>
                <h4 className="font-semibold mb-2">100% Secure</h4>
                <p className="text-sm text-muted-foreground">
                  All processing happens in your browser. Your files never leave your device.
                </p>
              </div>
              <div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 text-xl">⚡</span>
                </div>
                <h4 className="font-semibold mb-2">Lightning Fast</h4>
                <p className="text-sm text-muted-foreground">
                  Process your PDFs instantly without waiting for uploads or downloads.
                </p>
              </div>
              <div>
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 text-xl">💯</span>
                </div>
                <h4 className="font-semibold mb-2">Completely Free</h4>
                <p className="text-sm text-muted-foreground">
                  No registration, no hidden costs, no watermarks. Use all tools for free.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
