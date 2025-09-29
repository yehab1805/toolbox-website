"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CheckSquare, Plus, Trash2, Edit, Save, X, Filter, Calendar } from 'lucide-react'
import { TodoItem } from '@/types'
import { generateId } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  // Load todos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      setTodos(JSON.parse(saved))
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (!newTodo.trim()) {
      toast.error('Please enter a task')
      return
    }

    const todo: TodoItem = {
      id: generateId(),
      text: newTodo.trim(),
      completed: false,
      priority: 'medium',
      createdAt: new Date().toISOString()
    }

    setTodos(prev => [todo, ...prev])
    setNewTodo('')
    toast.success('Task added!')
  }

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
    toast.success('Task deleted!')
  }

  const startEditing = (todo: TodoItem) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = () => {
    if (!editText.trim()) {
      toast.error('Task cannot be empty')
      return
    }

    setTodos(prev => prev.map(todo => 
      todo.id === editingId ? { ...todo, text: editText.trim() } : todo
    ))
    setEditingId(null)
    setEditText('')
    toast.success('Task updated!')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const updatePriority = (id: string, priority: 'low' | 'medium' | 'high') => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, priority } : todo
    ))
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
    toast.success('Completed tasks cleared!')
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.filter(todo => !todo.completed).length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">To-Do List</h1>
        <p className="text-muted-foreground">
          Organize your tasks with priority levels and notes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Todo Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Task
            </CardTitle>
            <CardDescription>
              Create a new task to track
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={addTodo} className="w-full" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </CardContent>
        </Card>

        {/* Stats & Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Task Overview
            </CardTitle>
            <CardDescription>
              Your task statistics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{activeCount}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Filter Tasks:</label>
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'All', count: todos.length },
                  { id: 'active', label: 'Active', count: activeCount },
                  { id: 'completed', label: 'Done', count: completedCount }
                ].map((filterOption) => (
                  <Button
                    key={filterOption.id}
                    variant={filter === filterOption.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter(filterOption.id as any)}
                    className="flex-1"
                  >
                    {filterOption.label}
                    <Badge variant="secondary" className="ml-1">
                      {filterOption.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {completedCount > 0 && (
              <Button onClick={clearCompleted} variant="outline" className="w-full">
                Clear Completed
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Set Due Dates
            </Button>
            <Button variant="outline" className="w-full">
              <CheckSquare className="h-4 w-4 mr-2" />
              Mark All Done
            </Button>
            <Button variant="outline" className="w-full">
              Export Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Todo List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Your Tasks
          </CardTitle>
          <CardDescription>
            {filteredTodos.length} task{filteredTodos.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <CheckSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>
                {filter === 'all' 
                  ? 'No tasks yet. Add your first task above!'
                  : `No ${filter} tasks found.`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-4 border rounded-lg transition-all ${
                    todo.completed ? 'opacity-60 bg-muted' : 'hover:shadow-sm'
                  }`}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTodo(todo.id)}
                    className={`h-8 w-8 p-0 ${
                      todo.completed ? 'text-green-600' : 'text-muted-foreground'
                    }`}
                  >
                    <CheckSquare className={`h-4 w-4 ${todo.completed ? 'fill-current' : ''}`} />
                  </Button>

                  <div className="flex-1 min-w-0">
                    {editingId === todo.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1"
                          autoFocus
                        />
                        <Button size="sm" onClick={saveEdit}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className={`${todo.completed ? 'line-through' : ''} font-medium`}>
                          {todo.text}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>
                            {new Date(todo.createdAt).toLocaleDateString()}
                          </span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(todo.priority)}`}
                          >
                            {todo.priority}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>

                  {editingId !== todo.id && (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(todo)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
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
