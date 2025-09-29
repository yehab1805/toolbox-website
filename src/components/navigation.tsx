"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Search,
  Home,
  BookOpen,
  Briefcase,
  File,
  Heart,
  Settings
} from 'lucide-react'
import { categories } from '@/lib/tools'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Settings className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">ToolBox</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors"
              >
                {category.id === 'study' && <BookOpen className="h-4 w-4" />}
                {category.id === 'business' && <Briefcase className="h-4 w-4" />}
                {category.id === 'file' && <File className="h-4 w-4" />}
                {category.id === 'fun' && <Heart className="h-4 w-4" />}
                {category.id === 'utility' && <Settings className="h-4 w-4" />}
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-1">
                  {category.tools.length}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t py-4">
            <div className="space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="flex items-center justify-between text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    {category.id === 'study' && <BookOpen className="h-4 w-4" />}
                    {category.id === 'business' && <Briefcase className="h-4 w-4" />}
                    {category.id === 'file' && <File className="h-4 w-4" />}
                    {category.id === 'fun' && <Heart className="h-4 w-4" />}
                    {category.id === 'utility' && <Settings className="h-4 w-4" />}
                    <span>{category.name}</span>
                  </div>
                  <Badge variant="secondary">
                    {category.tools.length}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
