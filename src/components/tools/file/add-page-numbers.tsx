"use client";

import { useState } from 'react';
import { Hash, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from 'react-hot-toast';
import PDFToolBase from '@/components/pdf-tool-base';
import { PDFFile, PDFProcessor } from '@/lib/pdf-utils';

export default function AddPageNumbers() {
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom');
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');

  const handleProcess = async (filesToProcess: PDFFile[]) => {
    if (filesToProcess.length !== 1) {
      toast.error('Please select exactly one PDF file to add page numbers');
      return;
    }

    const file = filesToProcess[0];
    toast.loading('Adding page numbers...', { id: 'add-page-numbers' });

    try {
      const numberedBlob = await PDFProcessor.addPageNumbers(file, { position, alignment });
      
      const filename = PDFProcessor.generateFilename(
        file.name, 
        'numbered'
      );
      
      PDFProcessor.downloadBlob(numberedBlob, filename);
      toast.success('Page numbers added successfully!', { id: 'add-page-numbers' });
    } catch (error) {
      console.error('Add page numbers error:', error);
      toast.error('Failed to add page numbers. Please try again.', { id: 'add-page-numbers' });
      throw error;
    }
  };

  const positionOptions = [
    { value: 'bottom', label: 'Bottom of Page' },
    { value: 'top', label: 'Top of Page' },
  ];

  const alignmentOptions = [
    { value: 'left', label: 'Left', icon: <AlignLeft className="h-4 w-4" /> },
    { value: 'center', label: 'Center', icon: <AlignCenter className="h-4 w-4" /> },
    { value: 'right', label: 'Right', icon: <AlignRight className="h-4 w-4" /> },
  ];

  return (
    <PDFToolBase
      title="Add Page Numbers"
      description="Add page numbers to PDF documents"
      icon={<Hash className="h-8 w-8 text-primary" />}
      onProcess={handleProcess}
      multipleFiles={false}
      acceptedTypes={['.pdf']}
      maxFiles={1}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Page Number Settings
          </CardTitle>
          <CardDescription>
            Configure the position and alignment of page numbers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="position-select">Position</Label>
            <Select value={position} onValueChange={(value: 'bottom' | 'top') => setPosition(value)}>
              <SelectTrigger id="position-select">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                {positionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Alignment</Label>
            <div className="grid grid-cols-3 gap-2">
              {alignmentOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={alignment === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setAlignment(option.value as 'left' | 'center' | 'right')}
                  className="flex items-center gap-2"
                >
                  {option.icon}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <Hash className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Page numbers will be added to all pages of the PDF. The numbering starts from 1 and uses a standard font size.
            </p>
          </div>
        </CardContent>
      </Card>
    </PDFToolBase>
  );
}
