"use client";

import { useState } from 'react';
import { Lock, Unlock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import toast from 'react-hot-toast';
import PDFToolBase from '@/components/pdf-tool-base';
import { PDFFile, PDFProcessor } from '@/lib/pdf-utils';

export default function PDFPassword() {
  const [action, setAction] = useState<'protect' | 'unlock'>('protect');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleProcess = async (filesToProcess: PDFFile[]) => {
    if (filesToProcess.length !== 1) {
      toast.error('Please select exactly one PDF file');
      return;
    }

    if (action === 'protect' && !password.trim()) {
      toast.error('Please enter a password for protection');
      return;
    }

    if (action === 'unlock' && !password.trim()) {
      toast.error('Please enter the password to unlock');
      return;
    }

    const file = filesToProcess[0];
    const loadingMessage = action === 'protect' ? 'Protecting PDF...' : 'Unlocking PDF...';
    toast.loading(loadingMessage, { id: 'pdf-password' });

    try {
      let processedBlob: Blob;
      
      if (action === 'protect') {
        processedBlob = await PDFProcessor.protectPDF(file, password);
      } else {
        processedBlob = await PDFProcessor.unlockPDF(file, password);
      }
      
      const filename = PDFProcessor.generateFilename(
        file.name, 
        action === 'protect' ? 'protected' : 'unlocked'
      );
      
      PDFProcessor.downloadBlob(processedBlob, filename);
      
      const successMessage = action === 'protect' 
        ? 'PDF protected with password successfully!'
        : 'PDF unlocked successfully!';
      
      toast.success(successMessage, { id: 'pdf-password' });
    } catch (error) {
      console.error('Password operation error:', error);
      const errorMessage = action === 'protect'
        ? 'Failed to protect PDF. Please try again.'
        : 'Failed to unlock PDF. Please check the password.';
      toast.error(errorMessage, { id: 'pdf-password' });
      throw error;
    }
  };

  return (
    <PDFToolBase
      title="PDF Password"
      description={action === 'protect' ? 'Add password protection to PDF files' : 'Remove password protection from PDF files'}
      icon={action === 'protect' ? <Lock className="h-8 w-8 text-primary" /> : <Unlock className="h-8 w-8 text-primary" />}
      onProcess={handleProcess}
      multipleFiles={false}
      acceptedTypes={['.pdf']}
      maxFiles={1}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {action === 'protect' ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
            {action === 'protect' ? 'Protect PDF' : 'Unlock PDF'}
          </CardTitle>
          <CardDescription>
            {action === 'protect' 
              ? 'Add password protection to secure your PDF document'
              : 'Remove password protection to make the PDF accessible'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="action-mode"
              checked={action === 'protect'}
              onCheckedChange={(checked) => setAction(checked ? 'protect' : 'unlock')}
            />
            <Label htmlFor="action-mode" className="flex items-center gap-2">
              {action === 'protect' ? (
                <>
                  <Lock className="h-4 w-4" />
                  Protect PDF
                </>
              ) : (
                <>
                  <Unlock className="h-4 w-4" />
                  Unlock PDF
                </>
              )}
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {action === 'protect' ? 'Enter Password' : 'Enter Current Password'}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={action === 'protect' ? 'Enter new password' : 'Enter current password'}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            {action === 'protect' ? (
              <Lock className="h-4 w-4 text-blue-600" />
            ) : (
              <Unlock className="h-4 w-4 text-blue-600" />
            )}
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {action === 'protect' 
                ? 'The password will be required to open the PDF. Make sure to remember it!'
                : 'Enter the correct password to remove protection from the PDF.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </PDFToolBase>
  );
}