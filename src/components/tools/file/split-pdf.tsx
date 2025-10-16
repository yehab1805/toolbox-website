"use client";

import { useState } from 'react';
import { FileMinus, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import PDFToolBase from '@/components/pdf-tool-base';
import { PDFFile, PDFProcessor } from '@/lib/pdf-utils';

export default function SplitPDF() {
  const handleProcess = async (filesToProcess: PDFFile[]) => {
    if (filesToProcess.length !== 1) {
      toast.error('Please select exactly one PDF file to split');
      return;
    }

    const file = filesToProcess[0];
    toast.loading('Splitting PDF...', { id: 'split-pdf' });

    try {
      const pageBlobs = await PDFProcessor.splitPDF(file);
      
      // Download each page as a separate PDF
      for (let i = 0; i < pageBlobs.length; i++) {
        const filename = PDFProcessor.generateFilename(
          file.name, 
          `page_${i + 1}`
        );
        PDFProcessor.downloadBlob(pageBlobs[i], filename);
      }

      toast.success(`PDF split into ${pageBlobs.length} pages!`, { id: 'split-pdf' });
    } catch (error) {
      console.error('Split error:', error);
      toast.error('Failed to split PDF. Please try again.', { id: 'split-pdf' });
      throw error;
    }
  };

  return (
    <PDFToolBase
      title="Split PDFs"
      description="Split PDF files into separate pages"
      icon={<FileMinus className="h-8 w-8 text-primary" />}
      onProcess={handleProcess}
      multipleFiles={false}
      acceptedTypes={['.pdf']}
      maxFiles={1}
    >
      <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
        <FileMinus className="h-4 w-4 text-blue-600" />
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Each page will be saved as a separate PDF file. The download will start automatically after processing.
        </p>
      </div>
    </PDFToolBase>
  );
}