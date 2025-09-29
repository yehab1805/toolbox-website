"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Receipt, Plus, Trash2, Download, Save, FileText } from 'lucide-react'
import { Invoice, InvoiceItem } from '@/types'
import { generateId, formatCurrency, formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState<Invoice>({
    id: generateId(),
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    companyName: '',
    companyAddress: '',
    items: [{ description: '', quantity: 1, price: 0, total: 0 }],
    subtotal: 0,
    tax: 0,
    total: 0,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  })

  const updateInvoice = (field: keyof Invoice, value: any) => {
    setInvoice(prev => ({ ...prev, [field]: value }))
  }

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0, total: 0 }]
    }))
  }

  const removeItem = (index: number) => {
    if (invoice.items.length > 1) {
      setInvoice(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }))
    }
  }

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = invoice.items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value }
        if (field === 'quantity' || field === 'price') {
          updatedItem.total = updatedItem.quantity * updatedItem.price
        }
        return updatedItem
      }
      return item
    })

    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + tax

    setInvoice(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      tax,
      total
    }))
  }

  const generatePDF = () => {
    // This would integrate with a PDF generation library
    toast.success('PDF generation would be implemented here')
  }

  const saveInvoice = () => {
    const invoiceData = {
      ...invoice,
      savedAt: new Date().toISOString()
    }
    
    localStorage.setItem('invoice-' + invoice.id, JSON.stringify(invoiceData))
    toast.success('Invoice saved locally!')
  }

  const loadInvoice = () => {
    const saved = localStorage.getItem('invoice-' + invoice.id)
    if (saved) {
      const invoiceData = JSON.parse(saved)
      setInvoice(invoiceData)
      toast.success('Invoice loaded!')
    } else {
      toast.error('No saved invoice found')
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Invoice Generator</h1>
        <p className="text-muted-foreground">
          Create professional invoices and export to PDF
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>
                Your business details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Company Name *</label>
                  <Input
                    placeholder="Your Company Name"
                    value={invoice.companyName}
                    onChange={(e) => updateInvoice('companyName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Invoice Date</label>
                  <Input
                    type="date"
                    value={invoice.date}
                    onChange={(e) => updateInvoice('date', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Company Address</label>
                <Textarea
                  placeholder="Your company address"
                  value={invoice.companyAddress}
                  onChange={(e) => updateInvoice('companyAddress', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
              <CardDescription>
                Bill to details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Client Name *</label>
                  <Input
                    placeholder="Client Name"
                    value={invoice.clientName}
                    onChange={(e) => updateInvoice('clientName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Client Email</label>
                  <Input
                    type="email"
                    placeholder="client@example.com"
                    value={invoice.clientEmail}
                    onChange={(e) => updateInvoice('clientEmail', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Client Address</label>
                <Textarea
                  placeholder="Client address"
                  value={invoice.clientAddress}
                  onChange={(e) => updateInvoice('clientAddress', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Invoice Items */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Items</CardTitle>
              <CardDescription>
                Add products or services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {invoice.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 border rounded-lg">
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity || ''}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                    />
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Price"
                      value={item.price || ''}
                      onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                    />
                    <div className="flex items-center justify-center text-sm font-medium">
                      {formatCurrency(item.total)}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                      disabled={invoice.items.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button onClick={addItem} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Preview & Actions */}
        <div className="space-y-6">
          {/* Invoice Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Invoice Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-lg font-bold">{invoice.companyName || 'Your Company'}</div>
                <div className="text-sm text-muted-foreground">Invoice #{invoice.id}</div>
                <div className="text-sm text-muted-foreground">
                  Date: {formatDate(new Date(invoice.date))}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span className="font-medium">{formatCurrency(invoice.tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(invoice.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={generatePDF} className="w-full" size="lg">
                <Download className="h-4 w-4 mr-2" />
                Generate PDF
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={saveInvoice} variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={loadInvoice} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Load
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Items:</span>
                <span className="font-medium">{invoice.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Due Date:</span>
                <span className="font-medium">{formatDate(new Date(invoice.dueDate))}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <Badge variant="outline">Draft</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
