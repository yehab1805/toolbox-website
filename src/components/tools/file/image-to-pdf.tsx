"use client";

import { Image, FileImage } from 'lucide-react';
import toast from 'react-hot-toast';
import PDFToolBase from '@/components/pdf-tool-base';
import { PDFFile, PDFProcessor } from '@/lib/pdf-utils';

export default function ImageToPDF() {
  const handleProcess = async (filesToProcess: PDFFile[]) => {
    if (filesToProcess.length === 0) {
      toast.error('Please select at least one image file to convert');
      return;
    }

    toast.loading('Converting images to PDF...', { id: 'image-to-pdf' });

    try {
      const imageFiles = filesToProcess.map(f => f.file);
      const pdfBlob = await PDFProcessor.imagesToPDF(imageFiles);
      
      const filename = PDFProcessor.generateFilename(
        filesToProcess[0].name, 
        'converted'
      );
      
      PDFProcessor.downloadBlob(pdfBlob, filename);
      toast.success(`Successfully converted ${filesToProcess.length} image(s) to PDF!`, { id: 'image-to-pdf' });
    } catch (error) {
      console.error('Convert error:', error);
      toast.error('Failed to convert images to PDF. Please try again.', { id: 'image-to-pdf' });
      throw error;
    }
  };

  return (
    <PDFToolBase
      title="JPG to PDF"
      description="Convert JPG, PNG, and other image files to PDF documents"
      icon={<Image className="h-8 w-8 text-primary" />}
      onProcess={handleProcess}
      multipleFiles={true}
      acceptedTypes={['.jpg', '.jpeg', '.png', '.webp', '.bmp']}
      maxFiles={50}
    >
      <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
        <FileImage className="h-4 w-4 text-blue-600" />
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Each image will be added as a separate page in the PDF. Images will be automatically scaled to fit the page while maintaining aspect ratio.
        </p>
      </div>
    </PDFToolBase>
  );
}
