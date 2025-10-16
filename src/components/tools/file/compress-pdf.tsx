"use client";

import { useState } from 'react';
import { Archive, Sliders } from 'lucide-react';
import { Slider as SliderComponent } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import PDFToolBase from '@/components/pdf-tool-base';
import { PDFFile, PDFProcessor } from '@/lib/pdf-utils';

export default function CompressPDF() {
  const [compressionLevel, setCompressionLevel] = useState([80]);

  const handleProcess = async (filesToProcess: PDFFile[]) => {
    if (filesToProcess.length !== 1) {
      toast.error('Please select exactly one PDF file to compress');
      return;
    }

    const file = filesToProcess[0];
    toast.loading('Compressing PDF...', { id: 'compress-pdf' });

    try {
      const quality = compressionLevel[0] / 100;
      const compressedBlob = await PDFProcessor.compressPDF(file, quality);
      
      const filename = PDFProcessor.generateFilename(
        file.name, 
        'compressed'
      );
      
      PDFProcessor.downloadBlob(compressedBlob, filename);
      
      const originalSize = file.size;
      const compressedSize = compressedBlob.size;
      const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
      
      toast.success(`PDF compressed! Size reduced by ${reduction}%`, { id: 'compress-pdf' });
    } catch (error) {
      console.error('Compress error:', error);
      toast.error('Failed to compress PDF. Please try again.', { id: 'compress-pdf' });
      throw error;
    }
  };

  return (
    <PDFToolBase
      title="Compress PDFs"
      description="Reduce PDF file size while maintaining quality"
      icon={<Archive className="h-8 w-8 text-primary" />}
      onProcess={handleProcess}
      multipleFiles={false}
      acceptedTypes={['.pdf']}
      maxFiles={1}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="compression-slider" className="flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            Compression Level: {compressionLevel[0]}%
          </Label>
          <SliderComponent
            id="compression-slider"
            value={compressionLevel}
            onValueChange={setCompressionLevel}
            max={100}
            min={10}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>High Quality (Less Compression)</span>
            <span>Small Size (More Compression)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <Archive className="h-4 w-4 text-blue-600" />
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Higher compression reduces file size more but may slightly reduce image quality. 
            Recommended: 70-80% for most documents.
          </p>
        </div>
      </div>
    </PDFToolBase>
  );
}