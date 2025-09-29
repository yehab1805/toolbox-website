"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Ruler, ArrowRightLeft, Calculator, History } from 'lucide-react'
import toast from 'react-hot-toast'

interface Conversion {
  id: string
  from: string
  to: string
  value: number
  result: number
  timestamp: string
}

export default function UnitConverter() {
  const [category, setCategory] = useState<'length' | 'weight' | 'temperature' | 'area' | 'volume'>('length')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [value, setValue] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [conversionHistory, setConversionHistory] = useState<Conversion[]>([])

  const conversionCategories = {
    length: {
      name: 'Length',
      units: {
        'mm': { name: 'Millimeter', factor: 0.001 },
        'cm': { name: 'Centimeter', factor: 0.01 },
        'm': { name: 'Meter', factor: 1 },
        'km': { name: 'Kilometer', factor: 1000 },
        'in': { name: 'Inch', factor: 0.0254 },
        'ft': { name: 'Foot', factor: 0.3048 },
        'yd': { name: 'Yard', factor: 0.9144 },
        'mi': { name: 'Mile', factor: 1609.34 }
      }
    },
    weight: {
      name: 'Weight',
      units: {
        'mg': { name: 'Milligram', factor: 0.001 },
        'g': { name: 'Gram', factor: 1 },
        'kg': { name: 'Kilogram', factor: 1000 },
        'oz': { name: 'Ounce', factor: 28.3495 },
        'lb': { name: 'Pound', factor: 453.592 },
        'ton': { name: 'Metric Ton', factor: 1000000 }
      }
    },
    temperature: {
      name: 'Temperature',
      units: {
        'c': { name: 'Celsius', factor: 1 },
        'f': { name: 'Fahrenheit', factor: 1 },
        'k': { name: 'Kelvin', factor: 1 }
      }
    },
    area: {
      name: 'Area',
      units: {
        'mm²': { name: 'Square Millimeter', factor: 0.000001 },
        'cm²': { name: 'Square Centimeter', factor: 0.0001 },
        'm²': { name: 'Square Meter', factor: 1 },
        'km²': { name: 'Square Kilometer', factor: 1000000 },
        'in²': { name: 'Square Inch', factor: 0.00064516 },
        'ft²': { name: 'Square Foot', factor: 0.092903 },
        'acre': { name: 'Acre', factor: 4046.86 },
        'hectare': { name: 'Hectare', factor: 10000 }
      }
    },
    volume: {
      name: 'Volume',
      units: {
        'ml': { name: 'Milliliter', factor: 0.001 },
        'l': { name: 'Liter', factor: 1 },
        'm³': { name: 'Cubic Meter', factor: 1000 },
        'fl oz': { name: 'Fluid Ounce', factor: 0.0295735 },
        'cup': { name: 'Cup', factor: 0.236588 },
        'pt': { name: 'Pint', factor: 0.473176 },
        'qt': { name: 'Quart', factor: 0.946353 },
        'gal': { name: 'Gallon', factor: 3.78541 }
      }
    }
  }

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number
    
    // Convert to Celsius first
    switch (from) {
      case 'c':
        celsius = value
        break
      case 'f':
        celsius = (value - 32) * 5/9
        break
      case 'k':
        celsius = value - 273.15
        break
      default:
        return value
    }
    
    // Convert from Celsius to target
    switch (to) {
      case 'c':
        return celsius
      case 'f':
        return celsius * 9/5 + 32
      case 'k':
        return celsius + 273.15
      default:
        return value
    }
  }

  const convert = () => {
    if (!fromUnit || !toUnit || !value) {
      toast.error('Please fill in all fields')
      return
    }

    const numValue = parseFloat(value)
    if (isNaN(numValue)) {
      toast.error('Please enter a valid number')
      return
    }

    let convertedValue: number

    if (category === 'temperature') {
      convertedValue = convertTemperature(numValue, fromUnit, toUnit)
    } else {
      const fromFactor = (conversionCategories[category].units as any)[fromUnit]?.factor
      const toFactor = (conversionCategories[category].units as any)[toUnit]?.factor

      if (!fromFactor || !toFactor) {
        toast.error('Invalid units selected')
        return
      }

      // Convert to base unit, then to target unit
      const baseValue = numValue * fromFactor
      convertedValue = baseValue / toFactor
    }

    setResult(convertedValue)

    // Add to history
    const conversion: Conversion = {
      id: Date.now().toString(),
      from: fromUnit,
      to: toUnit,
      value: numValue,
      result: convertedValue,
      timestamp: new Date().toISOString()
    }
    setConversionHistory(prev => [conversion, ...prev.slice(0, 9)]) // Keep last 10

    toast.success('Conversion completed!')
  }

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
  }

  const clearConversion = () => {
    setValue('')
    setResult(null)
  }

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'length': return '📏'
      case 'weight': return '⚖️'
      case 'temperature': return '🌡️'
      case 'area': return '📐'
      case 'volume': return '🥤'
      default: return '📊'
    }
  }

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'length': return 'bg-blue-100 text-blue-800'
      case 'weight': return 'bg-green-100 text-green-800'
      case 'temperature': return 'bg-red-100 text-red-800'
      case 'area': return 'bg-purple-100 text-purple-800'
      case 'volume': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Unit Converter</h1>
        <p className="text-muted-foreground">
          Convert between different units of measurement
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Converter Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              Unit Converter
            </CardTitle>
            <CardDescription>
              Select category and units to convert
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category:</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(conversionCategories).map(([key, category]) => (
                  <Button
                    key={key}
                    variant={category.name === conversionCategories[category.name.toLowerCase() as keyof typeof conversionCategories]?.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setCategory(key as any)
                      setFromUnit('')
                      setToUnit('')
                      setValue('')
                      setResult(null)
                    }}
                    className="flex items-center gap-2"
                  >
                    <span>{getCategoryIcon(key)}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Value Input */}
            <div>
              <label className="text-sm font-medium">Value to Convert:</label>
              <Input
                type="number"
                step="any"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            {/* Unit Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">From:</label>
                <select
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                >
                  <option value="">Select unit</option>
                  {Object.entries(conversionCategories[category].units).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({key})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">To:</label>
                <select
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                >
                  <option value="">Select unit</option>
                  {Object.entries(conversionCategories[category].units).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({key})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <Button onClick={swapUnits} variant="outline" className="w-full">
              {/* <ArrowRightLeft className="h-4 w-4 mr-2" /> */}
              Swap Units
            </Button>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={convert} className="flex-1" size="lg">
                <Calculator className="h-4 w-4 mr-2" />
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
                  <div className="text-2xl font-bold text-primary">
                    {result.toFixed(6)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {(conversionCategories[category].units as any)[toUnit]?.name}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Conversion History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Recent Conversions
            </CardTitle>
            <CardDescription>
              Your recent conversion history
            </CardDescription>
          </CardHeader>
          <CardContent>
            {conversionHistory.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No conversions yet. Start converting to see your history here.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {conversionHistory.map((conversion) => (
                  <div
                    key={conversion.id}
                    className="p-3 border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">
                          {conversion.value} {conversion.from} = {conversion.result.toFixed(4)} {conversion.to}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(conversion.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <Badge className={getCategoryColor(category)}>
                        {getCategoryIcon(category)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Conversion Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Conversions</CardTitle>
          <CardDescription>
            Available unit categories and their conversions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(conversionCategories).map(([key, category]) => (
              <div key={key} className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <span>{getCategoryIcon(key)}</span>
                  {category.name}
                </h4>
                <div className="text-xs text-muted-foreground">
                  {Object.keys(category.units).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
