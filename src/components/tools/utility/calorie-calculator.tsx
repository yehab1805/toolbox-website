"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Zap, Activity, Target, TrendingUp, Heart, Calculator } from 'lucide-react'
import toast from 'react-hot-toast'

interface CalorieResult {
  bmr: number
  tdee: number
  maintenance: number
  weightLoss: number
  weightGain: number
  activityLevel: string
}

export default function CalorieCalculator() {
  const [age, setAge] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [activityLevel, setActivityLevel] = useState('1.2')
  const [goal, setGoal] = useState<'maintain' | 'lose' | 'gain'>('maintain')
  const [result, setResult] = useState<CalorieResult | null>(null)
  const [calculationHistory, setCalculationHistory] = useState<Array<{
    id: string
    result: CalorieResult
    timestamp: string
  }>>([])

  const activityLevels = {
    '1.2': { name: 'Sedentary', description: 'Little or no exercise' },
    '1.375': { name: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
    '1.55': { name: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
    '1.725': { name: 'Very Active', description: 'Heavy exercise 6-7 days/week' },
    '1.9': { name: 'Extremely Active', description: 'Very heavy exercise, physical job' }
  }

  const calculateCalories = () => {
    if (!age || !weight || !height) {
      toast.error('Please fill in all required fields')
      return
    }

    const ageNum = parseFloat(age)
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)
    const activityNum = parseFloat(activityLevel)

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum) || 
        ageNum <= 0 || weightNum <= 0 || heightNum <= 0) {
      toast.error('Please enter valid positive numbers')
      return
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number
    if (gender === 'male') {
      bmr = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) + 5
    } else {
      bmr = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) - 161
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityNum

    // Calculate goal-based calories
    const maintenance = tdee
    const weightLoss = tdee - 500 // 500 calorie deficit for 1 lb/week loss
    const weightGain = tdee + 500 // 500 calorie surplus for 1 lb/week gain

    const calorieResult: CalorieResult = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      maintenance: Math.round(maintenance),
      weightLoss: Math.round(weightLoss),
      weightGain: Math.round(weightGain),
      activityLevel: activityLevels[activityLevel as keyof typeof activityLevels].name
    }

    setResult(calorieResult)

    // Add to history
    const calculation = {
      id: Date.now().toString(),
      result: calorieResult,
      timestamp: new Date().toISOString()
    }
    setCalculationHistory(prev => [calculation, ...prev.slice(0, 9)]) // Keep last 10

    toast.success('Calories calculated successfully!')
  }

  const clearCalculation = () => {
    setAge('')
    setWeight('')
    setHeight('')
    setResult(null)
  }

  const getGoalColor = (goal: string) => {
    switch (goal) {
      case 'maintain': return 'bg-blue-100 text-blue-800'
      case 'lose': return 'bg-green-100 text-green-800'
      case 'gain': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityColor = (level: string) => {
    switch (level) {
      case 'Sedentary': return 'bg-red-100 text-red-800'
      case 'Lightly Active': return 'bg-yellow-100 text-yellow-800'
      case 'Moderately Active': return 'bg-blue-100 text-blue-800'
      case 'Very Active': return 'bg-green-100 text-green-800'
      case 'Extremely Active': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Calorie Calculator</h1>
        <p className="text-muted-foreground">
          Calculate daily calorie needs and burn rates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calorie Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Calorie Calculator
            </CardTitle>
            <CardDescription>
              Calculate your daily calorie needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Age (years):</label>
                <Input
                  type="number"
                  step="1"
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Gender:</label>
                <select
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Weight (kg):</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Height (cm):</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="text-sm font-medium">Activity Level:</label>
              <select
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
              >
                {Object.entries(activityLevels).map(([value, level]) => (
                  <option key={value} value={value}>
                    {level.name} - {level.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Goal */}
            <div>
              <label className="text-sm font-medium">Goal:</label>
              <div className="flex gap-2">
                {[
                  { id: 'maintain', label: 'Maintain Weight' },
                  { id: 'lose', label: 'Lose Weight' },
                  { id: 'gain', label: 'Gain Weight' }
                ].map((goalOption) => (
                  <Button
                    key={goalOption.id}
                    variant={goal === goalOption.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setGoal(goalOption.id as any)}
                  >
                    {goalOption.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={calculateCalories} className="flex-1" size="lg">
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
                    {goal === 'maintain' ? result.maintenance : 
                     goal === 'lose' ? result.weightLoss : result.weightGain} cal
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">Daily Calories</div>
                  <Badge className={getGoalColor(goal)}>
                    {goal === 'maintain' ? 'Maintenance' : 
                     goal === 'lose' ? 'Weight Loss' : 'Weight Gain'}
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
                <Target className="h-5 w-5" />
                Calorie Breakdown
              </CardTitle>
              <CardDescription>
                Detailed calorie information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">BMR (Basal Metabolic Rate):</span>
                  <span className="font-medium">{result.bmr} cal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">TDEE (Total Daily Energy Expenditure):</span>
                  <span className="font-medium">{result.tdee} cal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Maintenance Calories:</span>
                  <span className="font-medium">{result.maintenance} cal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Weight Loss (500 cal deficit):</span>
                  <span className="font-medium text-green-600">{result.weightLoss} cal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Weight Gain (500 cal surplus):</span>
                  <span className="font-medium text-orange-600">{result.weightGain} cal</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="text-xs text-muted-foreground mb-2">Activity Level:</div>
                <Badge className={getActivityColor(result.activityLevel)}>
                  {result.activityLevel}
                </Badge>
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
                Your recent calorie calculations
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
                          {calc.result.tdee} cal/day
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {calc.result.activityLevel}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(calc.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <Badge className={getActivityColor(calc.result.activityLevel)}>
                        {calc.result.activityLevel}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Calorie Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Calorie Tips</CardTitle>
          <CardDescription>
            Important considerations for calorie management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Weight Loss</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Aim for 500-1000 calorie deficit daily</li>
                <li>• Focus on nutrient-dense foods</li>
                <li>• Include regular exercise</li>
                <li>• Don't go below 1200 calories (women) or 1500 (men)</li>
                <li>• Track your progress weekly</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Weight Gain</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Aim for 300-500 calorie surplus daily</li>
                <li>• Focus on lean proteins and healthy fats</li>
                <li>• Include strength training</li>
                <li>• Eat frequent, balanced meals</li>
                <li>• Monitor your progress regularly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
