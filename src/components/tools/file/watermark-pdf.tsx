"use client";

import { useState } from 'react';
import { Stamp, Type } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';
import PDFToolBase from '@/components/pdf-tool-base';
import { PDFFile, PDFProcessor } from '@/lib/pdf-utils';

export default function WatermarkPDF() {
  const [watermarkText, setWatermarkText] = useState('DRAFT');

  const handleProcess = async (filesToProcess: PDFFile[]) => {
    if (filesToProcess.length !== 1) {
      toast.error('Please select exactly one PDF file to watermark');
      return;
    }

    if (!watermarkText.trim()) {
      toast.error('Please enter watermark text');
      return;
    }

    const file = filesToProcess[0];
    toast.loading('Adding watermark...', { id: 'watermark-pdf' });

    try {
      const watermarkedBlob = await PDFProcessor.addWatermark(file, watermarkText);
      
      const filename = PDFProcessor.generateFilename(
        file.name, 
        'watermarked'
      );
      
      PDFProcessor.downloadBlob(watermarkedBlob, filename);
      toast.success('Watermark added successfully!', { id: 'watermark-pdf' });
    } catch (error) {
      console.error('Watermark error:', error);
      toast.error('Failed to add watermark. Please try again.', { id: 'watermark-pdf' });
      throw error;
    }
  };

  return (
    <PDFToolBase
      title="Add Watermark"
      description="Add watermarks to PDF documents"
      icon={<Stamp className="h-8 w-8 text-primary" />}
      onProcess={handleProcess}
      multipleFiles={false}
      acceptedTypes={['.pdf']}
      maxFiles={1}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stamp className="h-5 w-5" />
            Watermark Settings
          </CardTitle>
          <CardDescription>
            Enter the text that will be used as a watermark on all pages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="watermark-text">Watermark Text</Label>
            <Input
              id="watermark-text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              placeholder="Enter watermark text (e.g., DRAFT, CONFIDENTIAL, etc.)"
              maxLength={50}
            />
            <p className="text-xs text-muted-foreground">
              {watermarkText.length}/50 characters
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <Type className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              The watermark will be applied diagonally across all pages with a semi-transparent appearance. 
              Common watermarks include "DRAFT", "CONFIDENTIAL", or "SAMPLE".
            </p>
          </div>
        </CardContent>
      </Card>
    </PDFToolBase>
  );
}
