"use client";

import { Image, FileImage } from 'lucide-react';
import toast from 'react-hot-toast';
import PDFToolBase from '@/components/pdf-tool-base';
import { PDFFile, PDFProcessor } from '@/lib/pdf-utils';

export default function PDFToJPG() {
  const handleProcess = async (filesToProcess: PDFFile[]) => {
    if (filesToProcess.length !== 1) {
      toast.error('Please select exactly one PDF file to convert');
      return;
    }

    const file = filesToProcess[0];
    toast.loading('Converting PDF to JPG...', { id: 'pdf-to-jpg' });

    try {
      const imageBlobs = await PDFProcessor.pdfToImages(file);
      
      // Download each page as a separate JPG
      for (let i = 0; i < imageBlobs.length; i++) {
        const filename = `${file.name.replace('.pdf', '')}_page_${i + 1}.jpg`;
        PDFProcessor.downloadBlob(imageBlobs[i], filename);
      }

      toast.success(`PDF converted to ${imageBlobs.length} JPG image(s)!`, { id: 'pdf-to-jpg' });
    } catch (error) {
      console.error('Convert error:', error);
      toast.error('Failed to convert PDF to JPG. Please try again.', { id: 'pdf-to-jpg' });
      throw error;
    }
  };

  return (
    <PDFToolBase
      title="PDF to JPG"
      description="Convert PDF pages to JPG images"
      icon={<Image className="h-8 w-8 text-primary" />}
      onProcess={handleProcess}
      multipleFiles={false}
      acceptedTypes={['.pdf']}
      maxFiles={1}
    >
      <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
        <FileImage className="h-4 w-4 text-blue-600" />
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Each page of the PDF will be converted to a separate JPG image. The download will start automatically after processing.
        </p>
      </div>
    </PDFToolBase>
  );
}
