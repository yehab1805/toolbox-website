"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Calculator, Trophy, TrendingUp } from 'lucide-react'
import { Grade } from '@/types'
import { generateId } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function GPACalculator() {
  const [grades, setGrades] = useState<Grade[]>([
    { subject: '', grade: '', credits: 0 }
  ])
  const [scale, setScale] = useState<'4.0' | '5.0' | '100'>('4.0')
  const [gpa, setGpa] = useState<number | null>(null)

  const addGrade = () => {
    setGrades([...grades, { subject: '', grade: '', credits: 0 }])
  }

  const removeGrade = (index: number) => {
    if (grades.length > 1) {
      setGrades(grades.filter((_, i) => i !== index))
    }
  }

  const updateGrade = (index: number, field: keyof Grade, value: string | number) => {
    const updatedGrades = grades.map((grade, i) => 
      i === index ? { ...grade, [field]: value } : grade
    )
    setGrades(updatedGrades)
  }

  const calculateGPA = () => {
    const validGrades = grades.filter(grade => 
      grade.subject && grade.grade && grade.credits > 0
    )

    if (validGrades.length === 0) {
      toast.error('Please add at least one grade')
      return
    }

    let totalPoints = 0
    let totalCredits = 0

    validGrades.forEach(grade => {
      const numericGrade = parseFloat(grade.grade)
      if (isNaN(numericGrade)) {
        toast.error(`Invalid grade for ${grade.subject}`)
        return
      }

      let points: number
      if (scale === '4.0') {
        if (numericGrade >= 90) points = 4.0
        else if (numericGrade >= 80) points = 3.0
        else if (numericGrade >= 70) points = 2.0
        else if (numericGrade >= 60) points = 1.0
        else points = 0.0
      } else if (scale === '5.0') {
        if (numericGrade >= 90) points = 5.0
        else if (numericGrade >= 80) points = 4.0
        else if (numericGrade >= 70) points = 3.0
        else if (numericGrade >= 60) points = 2.0
        else points = 1.0
      } else {
        points = numericGrade / 100 * 4.0
      }

      totalPoints += points * grade.credits
      totalCredits += grade.credits
    })

    if (totalCredits === 0) {
      toast.error('Total credits cannot be zero')
      return
    }

    const calculatedGPA = totalPoints / totalCredits
    setGpa(calculatedGPA)
    toast.success(`GPA calculated: ${calculatedGPA.toFixed(2)}`)
  }

  const getGPALevel = (gpa: number) => {
    if (gpa >= 3.7) return { level: 'Excellent', color: 'bg-green-100 text-green-800', icon: Trophy }
    if (gpa >= 3.0) return { level: 'Good', color: 'bg-blue-100 text-blue-800', icon: TrendingUp }
    if (gpa >= 2.0) return { level: 'Average', color: 'bg-yellow-100 text-yellow-800', icon: Calculator }
    return { level: 'Needs Improvement', color: 'bg-red-100 text-red-800', icon: Calculator }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">GPA Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your Grade Point Average with weighted and unweighted scales
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Grade Input
              </CardTitle>
              <CardDescription>
                Add your courses and grades to calculate your GPA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Scale Selection */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">GPA Scale:</label>
                <div className="flex gap-2">
                  {['4.0', '5.0', '100'].map((s) => (
                    <Button
                      key={s}
                      variant={scale === s ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setScale(s as any)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Grades List */}
              <div className="space-y-3">
                {grades.map((grade, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border rounded-lg">
                    <Input
                      placeholder="Subject"
                      value={grade.subject}
                      onChange={(e) => updateGrade(index, 'subject', e.target.value)}
                    />
                    <Input
                      placeholder="Grade"
                      value={grade.grade}
                      onChange={(e) => updateGrade(index, 'grade', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Credits"
                      value={grade.credits || ''}
                      onChange={(e) => updateGrade(index, 'credits', parseInt(e.target.value) || 0)}
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeGrade(index)}
                        disabled={grades.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={addGrade} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>

              <Button onClick={calculateGPA} className="w-full" size="lg">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate GPA
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {gpa !== null && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Your GPA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {gpa.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    on a {scale} scale
                  </div>
                  {(() => {
                    const level = getGPALevel(gpa)
                    const Icon = level.icon
                    return (
                      <Badge className={`${level.color} text-sm px-3 py-1`}>
                        <Icon className="h-3 w-3 mr-1" />
                        {level.level}
                      </Badge>
                    )
                  })()}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Credits:</span>
                    <span className="font-medium">
                      {grades.reduce((sum, grade) => sum + (grade.credits || 0), 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Courses:</span>
                    <span className="font-medium">
                      {grades.filter(g => g.subject && g.grade && g.credits > 0).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>GPA Scale Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>A (90-100):</span>
                <span className="font-medium">4.0</span>
              </div>
              <div className="flex justify-between">
                <span>B (80-89):</span>
                <span className="font-medium">3.0</span>
              </div>
              <div className="flex justify-between">
                <span>C (70-79):</span>
                <span className="font-medium">2.0</span>
              </div>
              <div className="flex justify-between">
                <span>D (60-69):</span>
                <span className="font-medium">1.0</span>
              </div>
              <div className="flex justify-between">
                <span>F (0-59):</span>
                <span className="font-medium">0.0</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
