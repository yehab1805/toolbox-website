"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Home, Calculator, TrendingUp, DollarSign, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'

interface MortgageResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  loanAmount: number
  interestRate: number
  loanTerm: number
}

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [downPayment, setDownPayment] = useState('')
  const [result, setResult] = useState<MortgageResult | null>(null)
  const [calculationHistory, setCalculationHistory] = useState<Array<{
    id: string
    result: MortgageResult
    timestamp: string
  }>>([])

  const calculateMortgage = () => {
    if (!loanAmount || !interestRate || !loanTerm) {
      toast.error('Please fill in all required fields')
      return
    }

    const principal = parseFloat(loanAmount)
    const rate = parseFloat(interestRate) / 100 / 12 // Monthly interest rate
    const payments = parseFloat(loanTerm) * 12 // Total number of payments

    if (isNaN(principal) || isNaN(rate) || isNaN(payments) || principal <= 0 || rate < 0 || payments <= 0) {
      toast.error('Please enter valid positive numbers')
      return
    }

    // Calculate monthly payment using the mortgage formula
    const monthlyPayment = (principal * rate * Math.pow(1 + rate, payments)) / 
                          (Math.pow(1 + rate, payments) - 1)

    const totalPayment = monthlyPayment * payments
    const totalInterest = totalPayment - principal

    const mortgageResult: MortgageResult = {
      monthlyPayment,
      totalPayment,
      totalInterest,
      loanAmount: principal,
      interestRate: parseFloat(interestRate),
      loanTerm: parseFloat(loanTerm)
    }

    setResult(mortgageResult)

    // Add to history
    const calculation = {
      id: Date.now().toString(),
      result: mortgageResult,
      timestamp: new Date().toISOString()
    }
    setCalculationHistory(prev => [calculation, ...prev.slice(0, 9)]) // Keep last 10

    toast.success('Mortgage calculated successfully!')
  }

  const clearCalculation = () => {
    setLoanAmount('')
    setInterestRate('')
    setLoanTerm('')
    setDownPayment('')
    setResult(null)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const getAffordabilityLevel = (payment: number) => {
    if (payment < 1000) return { level: 'Very Affordable', color: 'bg-green-100 text-green-800' }
    if (payment < 2000) return { level: 'Affordable', color: 'bg-blue-100 text-blue-800' }
    if (payment < 3000) return { level: 'Moderate', color: 'bg-yellow-100 text-yellow-800' }
    if (payment < 4000) return { level: 'Expensive', color: 'bg-orange-100 text-orange-800' }
    return { level: 'Very Expensive', color: 'bg-red-100 text-red-800' }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Mortgage Calculator</h1>
        <p className="text-muted-foreground">
          Calculate mortgage and loan payments
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mortgage Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Mortgage Calculator
            </CardTitle>
            <CardDescription>
              Calculate your monthly mortgage payments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Loan Amount */}
            <div>
              <label className="text-sm font-medium">Loan Amount ($):</label>
              <Input
                type="number"
                step="1000"
                placeholder="300000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className="text-sm font-medium">Interest Rate (%):</label>
              <Input
                type="number"
                step="0.01"
                placeholder="3.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>

            {/* Loan Term */}
            <div>
              <label className="text-sm font-medium">Loan Term (years):</label>
              <Input
                type="number"
                step="1"
                placeholder="30"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
              />
            </div>

            {/* Down Payment (Optional) */}
            <div>
              <label className="text-sm font-medium">Down Payment ($) - Optional:</label>
              <Input
                type="number"
                step="1000"
                placeholder="60000"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={calculateMortgage} className="flex-1" size="lg">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button onClick={clearCalculation} variant="outline">
                Clear
              </Button>
            </div>

            {/* Result Display */}
            {result && (
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatCurrency(result.monthlyPayment)}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">Monthly Payment</div>
                  <Badge className={getAffordabilityLevel(result.monthlyPayment).color}>
                    {getAffordabilityLevel(result.monthlyPayment).level}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed Results */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Payment Breakdown
              </CardTitle>
              <CardDescription>
                Detailed mortgage information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Monthly Payment:</span>
                  <span className="font-medium">{formatCurrency(result.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Payments:</span>
                  <span className="font-medium">{formatCurrency(result.totalPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Interest:</span>
                  <span className="font-medium text-red-600">{formatCurrency(result.totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Principal:</span>
                  <span className="font-medium">{formatCurrency(result.loanAmount)}</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="text-xs text-muted-foreground mb-2">Loan Details:</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span>{result.interestRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Term:</span>
                    <span>{result.loanTerm} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Payments:</span>
                    <span>{result.loanTerm * 12} months</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Calculation History */}
        {calculationHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Calculations</CardTitle>
              <CardDescription>
                Your recent mortgage calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {calculationHistory.map((calc) => (
                  <div
                    key={calc.id}
                    className="p-3 border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">
                          {formatCurrency(calc.result.monthlyPayment)}/month
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {calc.result.loanTerm} years @ {calc.result.interestRate}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(calc.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <Badge className={getAffordabilityLevel(calc.result.monthlyPayment).color}>
                        {getAffordabilityLevel(calc.result.monthlyPayment).level}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Mortgage Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Mortgage Tips</CardTitle>
          <CardDescription>
            Important considerations when calculating mortgages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Before You Buy</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Save for a 20% down payment to avoid PMI</li>
                <li>• Check your credit score and improve if needed</li>
                <li>• Get pre-approved for a mortgage</li>
                <li>• Consider all closing costs and fees</li>
                <li>• Factor in property taxes and insurance</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Payment Considerations</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Keep housing costs under 30% of income</li>
                <li>• Consider bi-weekly payments to save interest</li>
                <li>• Make extra principal payments when possible</li>
                <li>• Shop around for the best interest rates</li>
                <li>• Consider refinancing when rates drop</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
