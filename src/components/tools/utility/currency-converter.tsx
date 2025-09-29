"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DollarSign, ArrowRightLeft, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react'
import toast from 'react-hot-toast'

interface CurrencyRate {
  code: string
  name: string
  rate: number
  symbol: string
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [result, setResult] = useState<number | null>(null)
  const [conversionHistory, setConversionHistory] = useState<Array<{
    id: string
    amount: number
    from: string
    to: string
    result: number
    timestamp: string
  }>>([])

  // Fixed exchange rates (in a real app, these would come from an API)
  const exchangeRates: Record<string, CurrencyRate> = {
    USD: { code: 'USD', name: 'US Dollar', rate: 1.0, symbol: '$' },
    EUR: { code: 'EUR', name: 'Euro', rate: 0.85, symbol: '€' },
    GBP: { code: 'GBP', name: 'British Pound', rate: 0.73, symbol: '£' },
    JPY: { code: 'JPY', name: 'Japanese Yen', rate: 110.0, symbol: '¥' },
    CAD: { code: 'CAD', name: 'Canadian Dollar', rate: 1.25, symbol: 'C$' },
    AUD: { code: 'AUD', name: 'Australian Dollar', rate: 1.35, symbol: 'A$' },
    CHF: { code: 'CHF', name: 'Swiss Franc', rate: 0.92, symbol: 'CHF' },
    CNY: { code: 'CNY', name: 'Chinese Yuan', rate: 6.45, symbol: '¥' },
    INR: { code: 'INR', name: 'Indian Rupee', rate: 74.0, symbol: '₹' },
    BRL: { code: 'BRL', name: 'Brazilian Real', rate: 5.2, symbol: 'R$' },
    MXN: { code: 'MXN', name: 'Mexican Peso', rate: 20.0, symbol: '$' },
    KRW: { code: 'KRW', name: 'South Korean Won', rate: 1180.0, symbol: '₩' },
    SGD: { code: 'SGD', name: 'Singapore Dollar', rate: 1.35, symbol: 'S$' },
    HKD: { code: 'HKD', name: 'Hong Kong Dollar', rate: 7.8, symbol: 'HK$' },
    NZD: { code: 'NZD', name: 'New Zealand Dollar', rate: 1.45, symbol: 'NZ$' }
  }

  const convertCurrency = () => {
    if (!amount) {
      toast.error('Please enter an amount')
      return
    }

    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Please enter a valid positive number')
      return
    }

    const fromRate = exchangeRates[fromCurrency]
    const toRate = exchangeRates[toCurrency]

    if (!fromRate || !toRate) {
      toast.error('Invalid currency selected')
      return
    }

    // Convert to USD first, then to target currency
    const usdAmount = numAmount / fromRate.rate
    const convertedAmount = usdAmount * toRate.rate

    setResult(convertedAmount)

    // Add to history
    const conversion = {
      id: Date.now().toString(),
      amount: numAmount,
      from: fromCurrency,
      to: toCurrency,
      result: convertedAmount,
      timestamp: new Date().toISOString()
    }
    setConversionHistory(prev => [conversion, ...prev.slice(0, 9)]) // Keep last 10

    toast.success('Currency converted successfully!')
  }

  const swapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const clearConversion = () => {
    setAmount('')
    setResult(null)
  }

  const getCurrencySymbol = (code: string) => {
    return exchangeRates[code]?.symbol || code
  }

  const getCurrencyName = (code: string) => {
    return exchangeRates[code]?.name || code
  }

  const formatCurrency = (amount: number, code: string) => {
    const symbol = getCurrencySymbol(code)
    return `${symbol}${amount.toFixed(2)}`
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Currency Converter</h1>
        <p className="text-muted-foreground">
          Convert between different currencies with fixed exchange rates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Currency Converter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Currency Converter
            </CardTitle>
            <CardDescription>
              Convert between different currencies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Amount Input */}
            <div>
              <label className="text-sm font-medium">Amount:</label>
              <Input
                type="number"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Currency Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">From:</label>
                <select
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {Object.entries(exchangeRates).map(([code, currency]) => (
                    <option key={code} value={code}>
                      {currency.symbol} {currency.name} ({code})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">To:</label>
                <select
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {Object.entries(exchangeRates).map(([code, currency]) => (
                    <option key={code} value={code}>
                      {currency.symbol} {currency.name} ({code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <Button onClick={swapCurrencies} variant="outline" className="w-full">
              {/* <ArrowRightLeft className="h-4 w-4 mr-2" /> */}
              Swap Currencies
            </Button>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={convertCurrency} className="flex-1" size="lg">
                <RefreshCw className="h-4 w-4 mr-2" />
                Convert
              </Button>
              <Button onClick={clearConversion} variant="outline">
                Clear
              </Button>
            </div>

            {/* Result Display */}
            {result !== null && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {formatCurrency(result, toCurrency)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {getCurrencyName(toCurrency)}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exchange Rates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Exchange Rates
            </CardTitle>
            <CardDescription>
              Current rates relative to USD
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {Object.entries(exchangeRates)
                .filter(([code]) => code !== 'USD')
                .sort((a, b) => a[1].name.localeCompare(b[1].name))
                .map(([code, currency]) => (
                  <div
                    key={code}
                    className="flex items-center justify-between p-2 border rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{currency.symbol}</span>
                      <span className="text-sm">{currency.name}</span>
                    </div>
                    <Badge variant="outline">
                      {currency.rate.toFixed(2)}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion History */}
        {conversionHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversions</CardTitle>
              <CardDescription>
                Your recent currency conversions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {conversionHistory.map((conversion) => (
                  <div
                    key={conversion.id}
                    className="p-3 border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">
                          {formatCurrency(conversion.amount, conversion.from)} → {formatCurrency(conversion.result, conversion.to)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(conversion.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <Badge variant="outline">
                        {conversion.from} → {conversion.to}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Currency Information */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Currencies</CardTitle>
          <CardDescription>
            Available currencies for conversion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(exchangeRates).map(([code, currency]) => (
              <div key={code} className="text-center p-3 border rounded-lg">
                <div className="text-lg font-bold">{currency.symbol}</div>
                <div className="text-sm font-medium">{code}</div>
                <div className="text-xs text-muted-foreground">{currency.name}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="text-xs text-muted-foreground">
              <strong>Note:</strong> These are fixed exchange rates for demonstration purposes. 
              In a real application, you would use live exchange rate APIs like Fixer.io, 
              ExchangeRate-API, or CurrencyLayer to get current market rates.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
