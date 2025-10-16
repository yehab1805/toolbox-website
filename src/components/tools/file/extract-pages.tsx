"use client";

import { useState } from 'react';
import { FileUp, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';
import PDFToolBase from '@/components/pdf-tool-base';
import { PDFFile, PDFProcessor } from '@/lib/pdf-utils';

export default function ExtractPages() {
  const [pageNumbers, setPageNumbers] = useState('');
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const handleFileSelect = async (file: PDFFile) => {
    try {
      const pageCount = await PDFProcessor.getPageCount(file.file);
      setTotalPages(pageCount);
    } catch (error) {
      console.error('Error getting page count:', error);
    }
  };

  const parsePageNumbers = (input: string): number[] => {
    const numbers: number[] = [];
    const parts = input.split(',');

    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) {
            numbers.push(i);
          }
        }
      } else {
        const num = parseInt(trimmed);
        if (!isNaN(num)) {
          numbers.push(num);
        }
      }
    }

    return [...new Set(numbers)].sort((a, b) => a - b);
  };

  const handleProcess = async (filesToProcess: PDFFile[]) => {
    if (filesToProcess.length !== 1) {
      toast.error('Please select exactly one PDF file');
      return;
    }

    if (!pageNumbers.trim()) {
      toast.error('Please enter page numbers to extract');
      return;
    }

    const file = filesToProcess[0];
    const pagesToExtract = parsePageNumbers(pageNumbers);

    if (pagesToExtract.length === 0) {
      toast.error('Please enter valid page numbers');
      return;
    }

    if (totalPages && pagesToExtract.some(page => page < 1 || page > totalPages)) {
      toast.error(`Page numbers must be between 1 and ${totalPages}`);
      return;
    }

    toast.loading('Extracting pages...', { id: 'extract-pages' });

    try {
      const extractedBlob = await PDFProcessor.extractPages(file, pagesToExtract);
      
      const filename = PDFProcessor.generateFilename(
        file.name, 
        'extracted_pages'
      );
      
      PDFProcessor.downloadBlob(extractedBlob, filename);
      toast.success(`Successfully extracted ${pagesToExtract.length} page(s)!`, { id: 'extract-pages' });
    } catch (error) {
      console.error('Extract pages error:', error);
      toast.error('Failed to extract pages. Please try again.', { id: 'extract-pages' });
      throw error;
    }
  };

  return (
    <PDFToolBase
      title="Extract Pages"
      description="Extract specific pages from PDF documents"
      icon={<FileUp className="h-8 w-8 text-primary" />}
      onProcess={handleProcess}
      multipleFiles={false}
      acceptedTypes={['.pdf']}
      maxFiles={1}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Page Selection
          </CardTitle>
          <CardDescription>
            Enter the page numbers you want to extract from the PDF
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {totalPages && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                This PDF has {totalPages} page(s). Enter page numbers between 1 and {totalPages}.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="page-numbers">Page Numbers to Extract</Label>
            <Input
              id="page-numbers"
              value={pageNumbers}
              onChange={(e) => setPageNumbers(e.target.value)}
              placeholder="e.g., 1,3,5-8,10"
            />
            <p className="text-xs text-muted-foreground">
              Enter page numbers separated by commas. Use ranges with hyphens (e.g., 1,3,5-8,10)
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <FileUp className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              The specified pages will be extracted and combined into a new PDF document. The original PDF remains unchanged.
            </p>
          </div>
        </CardContent>
      </Card>
    </PDFToolBase>
  );
}
