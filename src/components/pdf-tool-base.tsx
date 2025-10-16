"use client";

import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Download, Trash2, AlertCircle, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { PDFFile, PDFProcessor } from '@/lib/pdf-utils';

interface PDFToolBaseProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onProcess: (files: PDFFile[]) => Promise<void>;
  multipleFiles?: boolean;
  acceptedTypes?: string[];
  maxFiles?: number;
  children?: React.ReactNode;
}

export default function PDFToolBase({
  title,
  description,
  icon,
  onProcess,
  multipleFiles = false,
  acceptedTypes = ['.pdf'],
  maxFiles = 10,
  children
}: PDFToolBaseProps) {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: PDFFile[] = [];
    const currentFileCount = files.length;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      // Check file type
      const isValidType = acceptedTypes.some(type => 
        type.startsWith('.') ? file.name.toLowerCase().endsWith(type) : file.type === type
      );

      if (!isValidType) {
        toast.error(`${file.name} is not a supported file type`);
        continue;
      }

      // Check file size for PDFs
      if (file.type === 'application/pdf') {
        const validation = PDFProcessor.validatePDF(file);
        if (!validation.isValid) {
          toast.error(`${file.name}: ${validation.error}`);
          continue;
        }
      }

      // Check max files limit
      if (currentFileCount + newFiles.length >= maxFiles) {
        toast.error(`Maximum ${maxFiles} files allowed`);
        break;
      }

      newFiles.push({
        id: Date.now().toString() + i,
        name: file.name,
        size: file.size,
        file: file
      });
    }

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} file(s) added`);
    }
  }, [files.length, acceptedTypes, maxFiles]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, [handleFileUpload]);

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const clearAllFiles = () => {
    setFiles([]);
  };

  const processFiles = async () => {
    if (files.length === 0) {
      toast.error('Please add files to process');
      return;
    }

    setIsProcessing(true);
    try {
      await onProcess(files);
    } catch (error) {
      console.error('Processing error:', error);
      toast.error('Failed to process files. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    return PDFProcessor.formatFileSize(bytes);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          {icon}
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Upload Files
          </CardTitle>
          <CardDescription>
            {multipleFiles 
              ? `Select multiple files to process. Maximum ${maxFiles} files allowed.`
              : 'Select a file to process.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <div className="space-y-2">
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>Choose Files</span>
                </Button>
              </Label>
              <Input
                id="file-upload"
                type="file"
                multiple={multipleFiles}
                accept={acceptedTypes.join(',')}
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
              <p className="text-sm text-muted-foreground">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: {acceptedTypes.join(', ')}
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Files ({files.length})</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFiles}
                  disabled={isProcessing}
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      disabled={isProcessing}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  All processing is done locally in your browser. Your files are never uploaded to our servers.
                </p>
              </div>

              {children}

              <Button
                onClick={processFiles}
                disabled={files.length === 0 || isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Process & Download
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
