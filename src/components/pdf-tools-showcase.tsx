"use client"

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FilePlus,
  FileMinus,
  FileX,
  FileUp,
  Archive,
  Image,
  FileText,
  Presentation,
  Table,
  Code,
  RotateCcw,
  Hash,
  Stamp,
  Crop,
  Edit,
  Unlock,
  Lock,
  PenTool,
  EyeOff,
  GitCompare,
  ChevronRight
} from 'lucide-react'

// Define PDF tool categories with their tools
const pdfToolCategories = [
  {
    id: 'organizer',
    name: 'PDF Organizer',
    description: 'Organize and manage your PDF documents',
    icon: Archive,
    color: 'from-blue-500 to-cyan-500',
    tools: [
      {
        id: 'organize-pdf',
        name: 'Organize PDF',
        description: 'Sort and organize PDF pages automatically',
        icon: FileText,
        path: '/tools/file/organize-pdf',
        available: true
      },
      {
        id: 'merge-pdf',
        name: 'Merge PDFs',
        description: 'Combine multiple PDF files into one',
        icon: FilePlus,
        path: '/tools/file/merge-pdf',
        available: true
      },
      {
        id: 'split-pdf',
        name: 'Split PDFs',
        description: 'Split PDF files into separate pages',
        icon: FileMinus,
        path: '/tools/file/split-pdf',
        available: true
      },
      {
        id: 'remove-pages',
        name: 'Remove Pages',
        description: 'Remove specific pages from PDF documents',
        icon: FileX,
        path: '/tools/file/remove-pages',
        available: true
      },
      {
        id: 'extract-pages',
        name: 'Extract Pages',
        description: 'Extract specific pages from PDF documents',
        icon: FileUp,
        path: '/tools/file/extract-pages',
        available: true
      },
      {
        id: 'compress-pdf',
        name: 'Compress PDFs',
        description: 'Reduce PDF file size while maintaining quality',
        icon: Archive,
        path: '/tools/file/compress-pdf',
        available: true
      }
    ]
  },
  {
    id: 'convert-to-pdf',
    name: 'Convert to PDF',
    description: 'Convert various file formats to PDF',
    icon: FileText,
    color: 'from-green-500 to-emerald-500',
    tools: [
      {
        id: 'image-to-pdf',
        name: 'JPG to PDF',
        description: 'Convert JPG images to PDF documents',
        icon: Image,
        path: '/tools/file/image-to-pdf',
        available: true
      },
      {
        id: 'word-to-pdf',
        name: 'Word to PDF',
        description: 'Convert Word documents to PDF format',
        icon: FileText,
        path: '/tools/file/word-to-pdf',
        available: true
      },
      {
        id: 'powerpoint-to-pdf',
        name: 'PowerPoint to PDF',
        description: 'Convert PowerPoint presentations to PDF',
        icon: Presentation,
        path: '/tools/file/powerpoint-to-pdf',
        available: true
      },
      {
        id: 'excel-to-pdf',
        name: 'Excel to PDF',
        description: 'Convert Excel spreadsheets to PDF format',
        icon: Table,
        path: '/tools/file/excel-to-pdf',
        available: true
      },
      {
        id: 'html-to-pdf',
        name: 'HTML to PDF',
        description: 'Convert HTML files to PDF documents',
        icon: Code,
        path: '/tools/file/html-to-pdf',
        available: true
      }
    ]
  },
  {
    id: 'convert-from-pdf',
    name: 'Convert from PDF',
    description: 'Convert PDF documents to other formats',
    icon: FileUp,
    color: 'from-purple-500 to-violet-500',
    tools: [
      {
        id: 'pdf-to-jpg',
        name: 'PDF to JPG',
        description: 'Convert PDF pages to JPG images',
        icon: Image,
        path: '/tools/file/pdf-to-jpg',
        available: true
      },
      {
        id: 'pdf-to-word',
        name: 'PDF to Word',
        description: 'Convert PDF documents to Word format',
        icon: FileText,
        path: '/tools/file/pdf-to-word',
        available: true
      },
      {
        id: 'pdf-to-powerpoint',
        name: 'PDF to PowerPoint',
        description: 'Convert PDF to PowerPoint presentation',
        icon: Presentation,
        path: '/tools/file/pdf-to-powerpoint',
        available: true
      },
      {
        id: 'pdf-to-excel',
        name: 'PDF to Excel',
        description: 'Convert PDF tables to Excel spreadsheets',
        icon: Table,
        path: '/tools/file/pdf-to-excel',
        available: true
      },
      {
        id: 'pdf-to-pdfa',
        name: 'PDF to PDF/A',
        description: 'Convert PDF to PDF/A format for archiving',
        icon: Archive,
        path: '/tools/file/pdf-to-pdfa',
        available: true
      }
    ]
  },
  {
    id: 'edit-pdf',
    name: 'Edit PDF',
    description: 'Edit and modify PDF documents',
    icon: Edit,
    color: 'from-orange-500 to-amber-500',
    tools: [
      {
        id: 'rotate-pdf',
        name: 'Rotate PDF',
        description: 'Rotate PDF pages to correct orientation',
        icon: RotateCcw,
        path: '/tools/file/rotate-pdf',
        available: true
      },
      {
        id: 'add-page-numbers',
        name: 'Add Page Numbers',
        description: 'Add page numbers to PDF documents',
        icon: Hash,
        path: '/tools/file/add-page-numbers',
        available: true
      },
      {
        id: 'watermark-pdf',
        name: 'Add Watermark',
        description: 'Add watermarks to PDF documents',
        icon: Stamp,
        path: '/tools/file/watermark-pdf',
        available: true
      },
      {
        id: 'crop-pdf',
        name: 'Crop PDF',
        description: 'Crop PDF pages to remove unwanted areas',
        icon: Crop,
        path: '/tools/file/crop-pdf',
        available: true
      },
      {
        id: 'edit-pdf',
        name: 'Edit PDF',
        description: 'Add text, highlights, and drawings to PDF',
        icon: Edit,
        path: '/tools/file/edit-pdf',
        available: true
      }
    ]
  },
  {
    id: 'security',
    name: 'PDF Security',
    description: 'Secure and protect your PDF documents',
    icon: Lock,
    color: 'from-red-500 to-rose-500',
    tools: [
      {
        id: 'unlock-pdf',
        name: 'Unlock PDF',
        description: 'Remove password protection from PDF files',
        icon: Unlock,
        path: '/tools/file/unlock-pdf',
        available: true
      },
      {
        id: 'pdf-password',
        name: 'Protect PDF',
        description: 'Add password protection to PDF files',
        icon: Lock,
        path: '/tools/file/pdf-password',
        available: true
      },
      {
        id: 'sign-pdf',
        name: 'Sign PDF',
        description: 'Add digital signatures to PDF documents',
        icon: PenTool,
        path: '/tools/file/sign-pdf',
        available: true
      },
      {
        id: 'redact-pdf',
        name: 'Redact PDF',
        description: 'Remove sensitive information from PDF files',
        icon: EyeOff,
        path: '/tools/file/redact-pdf',
        available: true
      },
      {
        id: 'compare-pdf',
        name: 'Compare PDF',
        description: 'Compare two PDF documents for differences',
        icon: GitCompare,
        path: '/tools/file/compare-pdf',
        available: true
      }
    ]
  }
]


export default function PDFToolsShowcase() {
  return (
    <section id="pdf-tools" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            PDF Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional PDF processing tools for all your document needs. 
            Merge, split, convert, edit, and secure your PDFs with ease.
          </p>
        </div>

        <div className="space-y-16">
          {pdfToolCategories.map((category) => {
            const CategoryIcon = category.icon
            
            return (
              <div key={category.id}>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${category.color} text-white`}>
                    <CategoryIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    {category.tools.filter(tool => tool.available).length} available
                  </Badge>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool) => {
                    const ToolIcon = tool.icon || FileText
                    const isAvailable = tool.available
                    
                    return (
                      <Card 
                        key={tool.id} 
                        className={`group transition-all duration-300 ${
                          isAvailable 
                            ? 'hover:shadow-xl hover:-translate-y-2 cursor-pointer' 
                            : 'opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                              isAvailable ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                            }`}>
                              <ToolIcon className="h-5 w-5" />
                            </div>
                            {isAvailable && (
                              <Badge variant="default" className="text-xs">
                                Available
                              </Badge>
                            )}
                            {!isAvailable && (
                              <Badge variant="outline" className="text-xs">
                                Coming Soon
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <CardDescription className="text-sm">
                            {tool.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          {isAvailable ? (
                            <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              <Link href={tool.path} className="flex items-center justify-center gap-2">
                                Use Tool
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              className="w-full cursor-not-allowed"
                              disabled
                            >
                              Coming Soon
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* Divider */}
                <div className="mt-16 border-t border-border/50" />
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Need More PDF Tools?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're constantly adding new PDF processing capabilities. 
              Check back regularly for updates and new features.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
              <Link href="#tools">
                View All Tools
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
