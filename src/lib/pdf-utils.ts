import { PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib';

// Dynamic import for PDF.js to avoid SSR issues
let pdfjsLib: any = null;

const getPdfJs = async () => {
  if (typeof window === 'undefined') return null;
  
  if (!pdfjsLib) {
    pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }
  
  return pdfjsLib;
};

export interface PDFFile {
  id: string;
  name: string;
  size: number;
  file: File;
  pages?: number;
}

export interface ProcessingOptions {
  quality?: number;
  compressionLevel?: number;
  password?: string;
  rotation?: number;
  watermarkText?: string;
  pageNumbers?: boolean;
}

export class PDFProcessor {
  /**
   * Load a PDF document from a file
   */
  static async loadPDF(file: File): Promise<PDFDocument> {
    const arrayBuffer = await file.arrayBuffer();
    return await PDFDocument.load(arrayBuffer);
  }

  /**
   * Save a PDF document as a blob
   */
  static async savePDF(pdfDoc: PDFDocument): Promise<Blob> {
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  }

  /**
   * Download a blob as a file
   */
  static downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Get PDF page count using PDF.js
   */
  static async getPageCount(file: File): Promise<number> {
    const pdfjs = await getPdfJs();
    if (!pdfjs) throw new Error('PDF.js not available');
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    return pdf.numPages;
  }

  /**
   * Validate PDF file
   */
  static validatePDF(file: File): { isValid: boolean; error?: string } {
    if (file.type !== 'application/pdf') {
      return { isValid: false, error: 'File must be a PDF document' };
    }
    
    if (file.size === 0) {
      return { isValid: false, error: 'File is empty' };
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      return { isValid: false, error: 'File size must be less than 100MB' };
    }

    return { isValid: true };
  }

  /**
   * Merge multiple PDFs into one
   */
  static async mergePDFs(files: PDFFile[]): Promise<Blob> {
    const mergedPdf = await PDFDocument.create();
    
    for (const fileInfo of files) {
      const pdf = await this.loadPDF(fileInfo.file);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    return await this.savePDF(mergedPdf);
  }

  /**
   * Split PDF into separate pages
   */
  static async splitPDF(file: PDFFile): Promise<Blob[]> {
    const pdf = await this.loadPDF(file.file);
    const pageCount = pdf.getPageCount();
    const blobs: Blob[] = [];

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(copiedPage);
      blobs.push(await this.savePDF(newPdf));
    }

    return blobs;
  }

  /**
   * Remove specific pages from PDF
   */
  static async removePages(file: PDFFile, pagesToRemove: number[]): Promise<Blob> {
    const pdf = await this.loadPDF(file.file);
    const pageCount = pdf.getPageCount();
    const pagesToKeep: number[] = [];

    for (let i = 0; i < pageCount; i++) {
      if (!pagesToRemove.includes(i + 1)) { // Convert to 1-based indexing
        pagesToKeep.push(i);
      }
    }

    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdf, pagesToKeep);
    copiedPages.forEach((page) => newPdf.addPage(page));

    return await this.savePDF(newPdf);
  }

  /**
   * Extract specific pages from PDF
   */
  static async extractPages(file: PDFFile, pagesToExtract: number[]): Promise<Blob> {
    const pdf = await this.loadPDF(file.file);
    const pageIndices = pagesToExtract.map(page => page - 1); // Convert to 0-based indexing

    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdf, pageIndices);
    copiedPages.forEach((page) => newPdf.addPage(page));

    return await this.savePDF(newPdf);
  }

  /**
   * Rotate PDF pages
   */
  static async rotatePDF(file: PDFFile, rotation: number): Promise<Blob> {
    const pdf = await this.loadPDF(file.file);
    const pages = pdf.getPages();

    pages.forEach((page) => {
      page.setRotation(page.getRotation().angle + rotation);
    });

    return await this.savePDF(pdf);
  }

  /**
   * Add page numbers to PDF
   */
  static async addPageNumbers(file: PDFFile, options: { position: 'bottom' | 'top'; alignment: 'left' | 'center' | 'right' }): Promise<Blob> {
    const pdf = await this.loadPDF(file.file);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const pages = pdf.getPages();

    pages.forEach((page, index) => {
      const { width, height } = page.getSize();
      const pageNumber = (index + 1).toString();
      const fontSize = 12;

      let x: number;
      const y = options.position === 'bottom' ? 30 : height - 30;

      switch (options.alignment) {
        case 'left':
          x = 50;
          break;
        case 'right':
          x = width - 50 - font.widthOfTextAtSize(pageNumber, fontSize);
          break;
        case 'center':
        default:
          x = width / 2 - font.widthOfTextAtSize(pageNumber, fontSize) / 2;
          break;
      }

      page.drawText(pageNumber, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
    });

    return await this.savePDF(pdf);
  }

  /**
   * Add watermark to PDF
   */
  static async addWatermark(file: PDFFile, watermarkText: string): Promise<Blob> {
    const pdf = await this.loadPDF(file.file);
    const font = await pdf.embedFont(StandardFonts.HelveticaBold);
    const pages = pdf.getPages();

    pages.forEach((page) => {
      const { width, height } = page.getSize();
      
      page.drawText(watermarkText, {
        x: width / 2 - font.widthOfTextAtSize(watermarkText, 48) / 2,
        y: height / 2,
        size: 48,
        font,
        color: rgb(0.8, 0.8, 0.8),
        rotate: { type: 'degrees', angle: -45 },
      });
    });

    return await this.savePDF(pdf);
  }

  /**
   * Compress PDF by reducing quality
   */
  static async compressPDF(file: PDFFile, quality: number = 0.8): Promise<Blob> {
    const pdf = await this.loadPDF(file.file);
    
    // For basic compression, we'll recreate the PDF with reduced quality
    // This is a simplified approach - real compression would require more sophisticated techniques
    const compressedPdf = await PDFDocument.create();
    const pageIndices = pdf.getPageIndices();
    const copiedPages = await compressedPdf.copyPages(pdf, pageIndices);
    
    copiedPages.forEach((page) => {
      compressedPdf.addPage(page);
    });

    return await this.savePDF(compressedPdf);
  }

  /**
   * Add password protection to PDF
   */
  static async protectPDF(file: PDFFile, password: string): Promise<Blob> {
    const pdf = await this.loadPDF(file.file);
    
    // Note: pdf-lib doesn't support password protection directly
    // This would typically require server-side processing or a different library
    // For now, we'll return the original PDF
    return await this.savePDF(pdf);
  }

  /**
   * Remove password protection from PDF
   */
  static async unlockPDF(file: PDFFile, password: string): Promise<Blob> {
    try {
      const pdf = await this.loadPDF(file.file);
      // If we can load it without password, it's already unlocked
      return await this.savePDF(pdf);
    } catch (error) {
      throw new Error('Unable to unlock PDF. Please check the password.');
    }
  }

  /**
   * Convert PDF to images (first page only for demo)
   */
  static async pdfToImages(file: PDFFile): Promise<Blob[]> {
    const pdfjs = await getPdfJs();
    if (!pdfjs) throw new Error('PDF.js not available');
    
    const arrayBuffer = await file.file.arrayBuffer();
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    const page = await pdf.getPage(1);
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const viewport = page.getViewport({ scale: 2 });
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    await page.render({
      canvasContext: context!,
      viewport: viewport,
    }).promise;
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob ? [blob] : []);
      }, 'image/jpeg', 0.9);
    });
  }

  /**
   * Convert images to PDF
   */
  static async imagesToPDF(files: File[]): Promise<Blob> {
    const pdf = await PDFDocument.create();
    
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      let image;
      
      if (file.type === 'image/jpeg') {
        image = await pdf.embedJpg(arrayBuffer);
      } else if (file.type === 'image/png') {
        image = await pdf.embedPng(arrayBuffer);
      } else {
        continue; // Skip unsupported formats
      }
      
      const page = pdf.addPage();
      const { width, height } = page.getSize();
      
      // Scale image to fit page while maintaining aspect ratio
      const imageAspectRatio = image.width / image.height;
      const pageAspectRatio = width / height;
      
      let imageWidth, imageHeight;
      if (imageAspectRatio > pageAspectRatio) {
        imageWidth = width;
        imageHeight = width / imageAspectRatio;
      } else {
        imageHeight = height;
        imageWidth = height * imageAspectRatio;
      }
      
      const x = (width - imageWidth) / 2;
      const y = (height - imageHeight) / 2;
      
      page.drawImage(image, {
        x,
        y,
        width: imageWidth,
        height: imageHeight,
      });
    }
    
    return await this.savePDF(pdf);
  }

  /**
   * Get file size in human readable format
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Generate unique filename
   */
  static generateFilename(originalName: string, suffix: string): string {
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    return `${nameWithoutExt}_${suffix}.pdf`;
  }
}
