"use client";

import { useState } from 'react';
import { FileX, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';
import PDFToolBase from '@/components/pdf-tool-base';
import { PDFFile, PDFProcessor } from '@/lib/pdf-utils';

export default function RemovePages() {
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
      toast.error('Please enter page numbers to remove');
      return;
    }

    const file = filesToProcess[0];
    const pagesToRemove = parsePageNumbers(pageNumbers);

    if (pagesToRemove.length === 0) {
      toast.error('Please enter valid page numbers');
      return;
    }

    if (totalPages && pagesToRemove.some(page => page < 1 || page > totalPages)) {
      toast.error(`Page numbers must be between 1 and ${totalPages}`);
      return;
    }

    toast.loading('Removing pages...', { id: 'remove-pages' });

    try {
      const processedBlob = await PDFProcessor.removePages(file, pagesToRemove);
      
      const filename = PDFProcessor.generateFilename(
        file.name, 
        'pages_removed'
      );
      
      PDFProcessor.downloadBlob(processedBlob, filename);
      toast.success(`Successfully removed ${pagesToRemove.length} page(s)!`, { id: 'remove-pages' });
    } catch (error) {
      console.error('Remove pages error:', error);
      toast.error('Failed to remove pages. Please try again.', { id: 'remove-pages' });
      throw error;
    }
  };

  return (
    <PDFToolBase
      title="Remove Pages"
      description="Remove specific pages from PDF documents"
      icon={<FileX className="h-8 w-8 text-primary" />}
      onProcess={handleProcess}
      multipleFiles={false}
      acceptedTypes={['.pdf']}
      maxFiles={1}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Minus className="h-5 w-5" />
            Page Selection
          </CardTitle>
          <CardDescription>
            Enter the page numbers you want to remove from the PDF
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
            <Label htmlFor="page-numbers">Page Numbers to Remove</Label>
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
            <FileX className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              The specified pages will be permanently removed from the PDF. All other pages will remain unchanged.
            </p>
          </div>
        </CardContent>
      </Card>
    </PDFToolBase>
  );
}
