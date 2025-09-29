"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Plus, Trash2, Edit, Save, X, Filter, Download, DollarSign } from 'lucide-react'
import { Expense } from '@/types'
import { generateId, formatCurrency, formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editExpense, setEditExpense] = useState(newExpense)
  const [filter, setFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category'>('date')

  // Load expenses from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('expenses')
    if (saved) {
      setExpenses(JSON.parse(saved))
    }
  }, [])

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Other'
  ]

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.category) {
      toast.error('Please fill in all fields')
      return
    }

    const expense: Expense = {
      id: generateId(),
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date
    }

    setExpenses(prev => [expense, ...prev])
    setNewExpense({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    })
    toast.success('Expense added!')
  }

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id))
    toast.success('Expense deleted!')
  }

  const startEditing = (expense: Expense) => {
    setEditingId(expense.id)
    setEditExpense({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date
    })
  }

  const saveEdit = () => {
    if (!editExpense.description || !editExpense.amount || !editExpense.category) {
      toast.error('Please fill in all fields')
      return
    }

    setExpenses(prev => prev.map(expense => 
      expense.id === editingId 
        ? { 
            ...expense, 
            description: editExpense.description,
            amount: parseFloat(editExpense.amount),
            category: editExpense.category,
            date: editExpense.date
          }
        : expense
    ))
    setEditingId(null)
    toast.success('Expense updated!')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditExpense({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const filteredExpenses = expenses.filter(expense => {
    if (filter === 'all') return true
    return expense.category === filter
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'amount':
        return b.amount - a.amount
      case 'category':
        return a.category.localeCompare(b.category)
      default:
        return 0
    }
  })

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const categoryTotals = categories.map(category => ({
    category,
    total: expenses.filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  })).filter(item => item.total > 0)

  const getCategoryColor = (category: string) => {
    const colors = [
      'bg-red-100 text-red-800',
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-orange-100 text-orange-800',
      'bg-gray-100 text-gray-800'
    ]
    const index = categories.indexOf(category)
    return colors[index] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Expense Tracker</h1>
        <p className="text-muted-foreground">
          Track your expenses with categories and reports
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Add Expense */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Expense
            </CardTitle>
            <CardDescription>
              Record a new expense
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Description *</label>
              <Input
                placeholder="What did you spend on?"
                value={newExpense.description}
                onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Amount *</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={newExpense.amount}
                onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Category *</label>
              <select
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                value={newExpense.category}
                onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <Button onClick={addExpense} className="w-full" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {formatCurrency(totalExpenses)}
              </div>
              <div className="text-sm text-muted-foreground">Total Expenses</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Transactions:</span>
                <span className="font-medium">{expenses.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Categories Used:</span>
                <span className="font-medium">{categoryTotals.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average per Transaction:</span>
                <span className="font-medium">
                  {expenses.length > 0 ? formatCurrency(totalExpenses / expenses.length) : '$0.00'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              By Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categoryTotals.slice(0, 5).map((item) => (
                <div key={item.category} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </Badge>
                  </div>
                  <span className="font-medium">{formatCurrency(item.total)}</span>
                </div>
              ))}
              {categoryTotals.length > 5 && (
                <div className="text-xs text-muted-foreground text-center">
                  +{categoryTotals.length - 5} more categories
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Filters & Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Filter by Category:</label>
              <select
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm mt-1"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Sort by:</label>
              <select
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm mt-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>

            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Expense List */}
      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
          <CardDescription>
            {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No expenses found. Add your first expense above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-sm transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{expense.description}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{formatDate(new Date(expense.date))}</span>
                      <Badge className={`text-xs ${getCategoryColor(expense.category)}`}>
                        {expense.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold">{formatCurrency(expense.amount)}</div>
                  </div>

                  {editingId === expense.id ? (
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={saveEdit}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(expense)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
