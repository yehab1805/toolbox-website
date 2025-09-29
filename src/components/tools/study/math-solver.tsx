"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { FunctionSquare, Calculator, Lightbulb, BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'

interface MathProblem {
  id: string
  expression: string
  result: string
  steps: string[]
}

export default function MathSolver() {
  const [expression, setExpression] = useState('')
  const [history, setHistory] = useState<MathProblem[]>([])
  const [currentResult, setCurrentResult] = useState('')

  const solveExpression = () => {
    if (!expression.trim()) {
      toast.error('Please enter a mathematical expression')
      return
    }

    try {
      // Basic validation - only allow numbers, operators, and parentheses
      const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '')
      if (sanitized !== expression) {
        toast.error('Invalid characters in expression')
        return
      }

      // Evaluate the expression safely
      const result = Function('"use strict"; return (' + sanitized + ')')()
      
      if (isNaN(result) || !isFinite(result)) {
        toast.error('Invalid mathematical expression')
        return
      }

      const steps = generateSteps(sanitized)
      const problem: MathProblem = {
        id: Date.now().toString(),
        expression: expression,
        result: result.toString(),
        steps: steps
      }

      setCurrentResult(result.toString())
      setHistory(prev => [problem, ...prev.slice(0, 9)]) // Keep last 10
      toast.success('Expression solved!')
    } catch (error) {
      toast.error('Error solving expression')
    }
  }

  const generateSteps = (expr: string): string[] => {
    const steps: string[] = []
    
    // Basic step-by-step breakdown
    if (expr.includes('(')) {
      steps.push('Step 1: Solve parentheses first')
    }
    
    if (expr.includes('*') || expr.includes('/')) {
      steps.push('Step 2: Perform multiplication and division from left to right')
    }
    
    if (expr.includes('+') || expr.includes('-')) {
      steps.push('Step 3: Perform addition and subtraction from left to right')
    }
    
    steps.push(`Final result: ${expr} = ${Function('"use strict"; return (' + expr + ')')()}`)
    
    return steps
  }

  const clearAll = () => {
    setExpression('')
    setCurrentResult('')
    setHistory([])
  }

  const insertSymbol = (symbol: string) => {
    setExpression(prev => prev + symbol)
  }

  const getMathTips = () => [
    'Use + for addition, - for subtraction',
    'Use * for multiplication, / for division',
    'Use parentheses () for grouping',
    'Use . for decimal numbers',
    'Example: 2 * (3 + 4) / 2'
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Math Solver</h1>
        <p className="text-muted-foreground">
          Solve basic mathematical expressions with step-by-step solutions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculator Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Math Expression Solver
            </CardTitle>
            <CardDescription>
              Enter a mathematical expression to solve
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Expression Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Mathematical Expression:</label>
              <Input
                placeholder="e.g., 2 * (3 + 4) / 2"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                className="text-lg font-mono"
              />
            </div>

            {/* Quick Symbols */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quick Insert:</label>
              <div className="grid grid-cols-4 gap-2">
                {['+', '-', '*', '/', '(', ')', '.', '^'].map((symbol) => (
                  <Button
                    key={symbol}
                    variant="outline"
                    size="sm"
                    onClick={() => insertSymbol(symbol)}
                    className="font-mono"
                  >
                    {symbol}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={solveExpression} className="flex-1" size="lg">
                <FunctionSquare className="h-4 w-4 mr-2" />
                Solve
              </Button>
              <Button onClick={clearAll} variant="outline">
                Clear
              </Button>
            </div>

            {/* Result Display */}
            {currentResult && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Result:</div>
                <div className="text-2xl font-bold font-mono">{currentResult}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Math Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Math Tips
            </CardTitle>
            <CardDescription>
              How to use the math solver effectively
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getMathTips().map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    {index + 1}
                  </Badge>
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History */}
      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Calculation History
            </CardTitle>
            <CardDescription>
              Your recent calculations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.map((problem) => (
                <div key={problem.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-sm">{problem.expression}</div>
                    <Badge variant="secondary">{problem.result}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {problem.steps.map((step, index) => (
                      <div key={index}>{step}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Supported Operations */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Operations</CardTitle>
          <CardDescription>
            Mathematical operations you can perform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Basic Operations</h4>
              <div className="text-sm space-y-1">
                <div>• Addition: 2 + 3 = 5</div>
                <div>• Subtraction: 5 - 2 = 3</div>
                <div>• Multiplication: 3 * 4 = 12</div>
                <div>• Division: 8 / 2 = 4</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Advanced Features</h4>
              <div className="text-sm space-y-1">
                <div>• Parentheses: (2 + 3) * 4 = 20</div>
                <div>• Decimals: 3.14 * 2 = 6.28</div>
                <div>• Order of operations: 2 + 3 * 4 = 14</div>
                <div>• Complex expressions: (10 + 5) / 3 = 5</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
