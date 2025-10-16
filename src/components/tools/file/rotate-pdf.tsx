"use client";

import { useState } from 'react';
import { RotateCcw, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';
import PDFToolBase from '@/components/pdf-tool-base';
import { PDFFile, PDFProcessor } from '@/lib/pdf-utils';

export default function RotatePDF() {
  const [rotation, setRotation] = useState(0);

  const handleProcess = async (filesToProcess: PDFFile[]) => {
    if (filesToProcess.length !== 1) {
      toast.error('Please select exactly one PDF file to rotate');
      return;
    }

    if (rotation === 0) {
      toast.error('Please select a rotation angle');
      return;
    }

    const file = filesToProcess[0];
    toast.loading('Rotating PDF...', { id: 'rotate-pdf' });

    try {
      const rotatedBlob = await PDFProcessor.rotatePDF(file, rotation);
      
      const filename = PDFProcessor.generateFilename(
        file.name, 
        'rotated'
      );
      
      PDFProcessor.downloadBlob(rotatedBlob, filename);
      
      const rotationText = rotation === 90 ? '90° clockwise' : 
                          rotation === -90 ? '90° counter-clockwise' : 
                          rotation === 180 ? '180°' : `${rotation}°`;
      
      toast.success(`PDF rotated ${rotationText} successfully!`, { id: 'rotate-pdf' });
    } catch (error) {
      console.error('Rotate error:', error);
      toast.error('Failed to rotate PDF. Please try again.', { id: 'rotate-pdf' });
      throw error;
    }
  };

  const rotationOptions = [
    { value: 90, label: '90° Clockwise', icon: <RotateCw className="h-4 w-4" /> },
    { value: -90, label: '90° Counter-clockwise', icon: <RotateCcw className="h-4 w-4" /> },
    { value: 180, label: '180° Upside Down', icon: <RotateCcw className="h-4 w-4" /> },
  ];

  return (
    <PDFToolBase
      title="Rotate PDF"
      description="Rotate PDF pages to correct orientation"
      icon={<RotateCcw className="h-8 w-8 text-primary" />}
      onProcess={handleProcess}
      multipleFiles={false}
      acceptedTypes={['.pdf']}
      maxFiles={1}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Rotation Options
          </CardTitle>
          <CardDescription>
            Select the rotation angle for your PDF pages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {rotationOptions.map((option) => (
              <Button
                key={option.value}
                variant={rotation === option.value ? 'default' : 'outline'}
                className="justify-start h-auto p-4"
                onClick={() => setRotation(option.value)}
              >
                <div className="flex items-center gap-3">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <RotateCcw className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              All pages in the PDF will be rotated by the selected angle. This is useful for correcting scanned documents or adjusting page orientation.
            </p>
          </div>
        </CardContent>
      </Card>
    </PDFToolBase>
  );
}
