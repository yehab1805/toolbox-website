"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Activity, Heart, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface BMIResult {
  bmi: number
  category: string
  color: string
  icon: any
  description: string
  recommendations: string[]
}

export default function BMICalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [result, setResult] = useState<BMIResult | null>(null)
  const [history, setHistory] = useState<Array<{
    id: string
    bmi: number
    category: string
    timestamp: string
  }>>([])

  const calculateBMI = () => {
    if (!height || !weight) {
      toast.error('Please enter both height and weight')
      return
    }

    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)

    if (isNaN(heightNum) || isNaN(weightNum) || heightNum <= 0 || weightNum <= 0) {
      toast.error('Please enter valid positive numbers')
      return
    }

    let bmi: number
    let heightInMeters: number

    if (unit === 'metric') {
      heightInMeters = heightNum / 100 // Convert cm to meters
      bmi = weightNum / (heightInMeters * heightInMeters)
    } else {
      // Imperial: height in feet and inches, weight in pounds
      const totalInches = heightNum * 12 // Assuming heightNum is feet
      heightInMeters = totalInches * 0.0254
      bmi = (weightNum * 0.453592) / (heightInMeters * heightInMeters)
    }

    const bmiResult = getBMICategory(bmi)
    setResult(bmiResult)

    // Add to history
    const historyEntry = {
      id: Date.now().toString(),
      bmi: parseFloat(bmi.toFixed(1)),
      category: bmiResult.category,
      timestamp: new Date().toISOString()
    }
    setHistory(prev => [historyEntry, ...prev.slice(0, 9)]) // Keep last 10

    toast.success('BMI calculated successfully!')
  }

  const getBMICategory = (bmi: number): BMIResult => {
    if (bmi < 18.5) {
      return {
        bmi,
        category: 'Underweight',
        color: 'bg-blue-100 text-blue-800',
        icon: AlertCircle,
        description: 'You may be underweight. Consider consulting a healthcare provider.',
        recommendations: [
          'Focus on healthy weight gain',
          'Eat nutrient-dense foods',
          'Consider strength training',
          'Consult a healthcare provider'
        ]
      }
    } else if (bmi < 25) {
      return {
        bmi,
        category: 'Normal Weight',
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        description: 'Great! You\'re in a healthy weight range.',
        recommendations: [
          'Maintain current lifestyle',
          'Continue regular exercise',
          'Eat a balanced diet',
          'Get regular health checkups'
        ]
      }
    } else if (bmi < 30) {
      return {
        bmi,
        category: 'Overweight',
        color: 'bg-yellow-100 text-yellow-800',
        icon: TrendingUp,
        description: 'You may be overweight. Consider lifestyle changes.',
        recommendations: [
          'Increase physical activity',
          'Focus on portion control',
          'Eat more fruits and vegetables',
          'Consider consulting a healthcare provider'
        ]
      }
    } else {
      return {
        bmi,
        category: 'Obese',
        color: 'bg-red-100 text-red-800',
        icon: AlertCircle,
        description: 'You may be obese. Please consult a healthcare provider.',
        recommendations: [
          'Consult a healthcare provider',
          'Consider a structured weight loss program',
          'Focus on gradual lifestyle changes',
          'Seek professional guidance'
        ]
      }
    }
  }

  const clearResults = () => {
    setHeight('')
    setWeight('')
    setResult(null)
  }

  const getBMIColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'bg-blue-100 text-blue-800'
      case 'Normal Weight': return 'bg-green-100 text-green-800'
      case 'Overweight': return 'bg-yellow-100 text-yellow-800'
      case 'Obese': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your Body Mass Index and health metrics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BMI Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              BMI Calculator
            </CardTitle>
            <CardDescription>
              Enter your height and weight to calculate your BMI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Unit Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Unit System:</label>
              <div className="flex gap-2">
                <Button
                  variant={unit === 'metric' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUnit('metric')}
                >
                  Metric (cm, kg)
                </Button>
                <Button
                  variant={unit === 'imperial' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUnit('imperial')}
                >
                  Imperial (ft, lbs)
                </Button>
              </div>
            </div>

            {/* Height Input */}
            <div>
              <label className="text-sm font-medium">
                Height ({unit === 'metric' ? 'cm' : 'feet'}):
              </label>
              <Input
                type="number"
                step="0.1"
                placeholder={unit === 'metric' ? '170' : '5.7'}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            {/* Weight Input */}
            <div>
              <label className="text-sm font-medium">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'}):
              </label>
              <Input
                type="number"
                step="0.1"
                placeholder={unit === 'metric' ? '70' : '154'}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={calculateBMI} className="flex-1" size="lg">
                <Activity className="h-4 w-4 mr-2" />
                Calculate BMI
              </Button>
              <Button onClick={clearResults} variant="outline">
                Clear
              </Button>
            </div>

            {/* Result Display */}
            {result && (
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {result.bmi.toFixed(1)}
                  </div>
                  <Badge className={result.color} variant="secondary">
                    {result.category}
                  </Badge>
                </div>
                
                <div className="text-sm text-muted-foreground text-center">
                  {result.description}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* BMI Results & Recommendations */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Health Recommendations
              </CardTitle>
              <CardDescription>
                Personalized advice based on your BMI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Recommendations:</h4>
                <ul className="space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <div className="text-xs text-muted-foreground">
                  <strong>Note:</strong> BMI is a screening tool and doesn't account for muscle mass, 
                  bone density, or other factors. Consult a healthcare provider for personalized advice.
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* BMI History */}
        {history.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>BMI History</CardTitle>
              <CardDescription>
                Your recent BMI calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold">{entry.bmi}</div>
                      <Badge className={getBMIColor(entry.category)}>
                        {entry.category}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* BMI Categories Guide */}
      <Card>
        <CardHeader>
          <CardTitle>BMI Categories</CardTitle>
          <CardDescription>
            Understanding BMI ranges and what they mean
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">&lt; 18.5</div>
              <Badge className="bg-blue-100 text-blue-800 mb-2">Underweight</Badge>
              <p className="text-xs text-muted-foreground">
                May indicate malnutrition or other health issues
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">18.5 - 24.9</div>
              <Badge className="bg-green-100 text-green-800 mb-2">Normal Weight</Badge>
              <p className="text-xs text-muted-foreground">
                Healthy weight range for most people
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-2">25.0 - 29.9</div>
              <Badge className="bg-yellow-100 text-yellow-800 mb-2">Overweight</Badge>
              <p className="text-xs text-muted-foreground">
                May increase risk of health problems
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-2">≥ 30.0</div>
              <Badge className="bg-red-100 text-red-800 mb-2">Obese</Badge>
              <p className="text-xs text-muted-foreground">
                Significantly increased health risks
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
