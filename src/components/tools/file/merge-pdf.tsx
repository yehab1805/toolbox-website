"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FilePlus, ArrowUp, ArrowDown } from 'lucide-react';
import toast from 'react-hot-toast';
import PDFToolBase from '@/components/pdf-tool-base';
import { PDFFile, PDFProcessor } from '@/lib/pdf-utils';

interface MergePDFProps {
  files: PDFFile[];
  setFiles: (files: PDFFile[]) => void;
}

function MergePDFControls({ files, setFiles }: MergePDFProps) {
  const reorderFiles = (fromIndex: number, toIndex: number) => {
    const newFiles = [...files];
    const [movedFile] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, movedFile);
    setFiles(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    return PDFProcessor.formatFileSize(bytes);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Files to Merge ({files.length})</h3>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {files.map((file, index) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">
                {index + 1}.
              </span>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => reorderFiles(index, index - 1)}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              )}
              {index < files.length - 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => reorderFiles(index, index + 1)}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
        <FilePlus className="h-4 w-4 text-blue-600" />
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Files will be merged in the order shown above. Use the arrows to reorder.
        </p>
      </div>
    </div>
  );
}

export default function MergePDF() {
  const [files, setFiles] = useState<PDFFile[]>([]);

  const handleProcess = async (filesToProcess: PDFFile[]) => {
    if (filesToProcess.length < 2) {
      toast.error('Please add at least 2 PDF files to merge');
      return;
    }

    toast.loading('Merging PDFs...', { id: 'merge-pdf' });

    try {
      const mergedBlob = await PDFProcessor.mergePDFs(filesToProcess);
      const filename = PDFProcessor.generateFilename(
        filesToProcess[0].name, 
        'merged'
      );
      
      PDFProcessor.downloadBlob(mergedBlob, filename);
      toast.success('PDFs merged successfully!', { id: 'merge-pdf' });
    } catch (error) {
      console.error('Merge error:', error);
      toast.error('Failed to merge PDFs. Please try again.', { id: 'merge-pdf' });
      throw error;
    }
  };

  return (
    <PDFToolBase
      title="Merge PDFs"
      description="Combine multiple PDF files into a single document"
      icon={<FilePlus className="h-8 w-8 text-primary" />}
      onProcess={handleProcess}
      multipleFiles={true}
      acceptedTypes={['.pdf']}
      maxFiles={20}
    >
      <MergePDFControls files={files} setFiles={setFiles} />
    </PDFToolBase>
  );
}
