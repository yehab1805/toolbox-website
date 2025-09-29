"use client"

import Link from 'next/link'
import { Heart, Github, Twitter, Mail, Settings } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Settings className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">ToolBox</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your ultimate digital toolbox with 25+ free online tools for studying, 
              business, file management, and daily tasks.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Study Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold">Study & Education</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/study/gpa-calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  GPA Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/study/grade-calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  Grade Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/study/citation-generator" className="text-muted-foreground hover:text-primary transition-colors">
                  Citation Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/study/flashcard-maker" className="text-muted-foreground hover:text-primary transition-colors">
                  Flashcard Maker
                </Link>
              </li>
              <li>
                <Link href="/tools/study/math-solver" className="text-muted-foreground hover:text-primary transition-colors">
                  Math Solver
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold">Business & Productivity</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/business/invoice-generator" className="text-muted-foreground hover:text-primary transition-colors">
                  Invoice Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/business/todo-list" className="text-muted-foreground hover:text-primary transition-colors">
                  To-Do List
                </Link>
              </li>
              <li>
                <Link href="/tools/business/expense-tracker" className="text-muted-foreground hover:text-primary transition-colors">
                  Expense Tracker
                </Link>
              </li>
              <li>
                <Link href="/tools/business/qr-generator" className="text-muted-foreground hover:text-primary transition-colors">
                  QR Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/business/text-to-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Text to PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Fun & Utility Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold">Fun & Utility</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/fun/meme-generator" className="text-muted-foreground hover:text-primary transition-colors">
                  Meme Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/fun/name-generator" className="text-muted-foreground hover:text-primary transition-colors">
                  Name Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/fun/password-generator" className="text-muted-foreground hover:text-primary transition-colors">
                  Password Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/utility/unit-converter" className="text-muted-foreground hover:text-primary transition-colors">
                  Unit Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/utility/bmi-calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  BMI Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for students and professionals</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
