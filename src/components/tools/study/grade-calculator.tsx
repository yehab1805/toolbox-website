"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Calculator, Award, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'

interface GradeEntry {
  subject: string
  score: number
  maxScore: number
  weight: number
}

export default function GradeCalculator() {
  const [examType, setExamType] = useState<'igcse' | 'sat' | 'custom'>('igcse')
  const [grades, setGrades] = useState<GradeEntry[]>([
    { subject: '', score: 0, maxScore: 100, weight: 1 }
  ])
  const [result, setResult] = useState<{
    totalScore: number
    percentage: number
    grade: string
    level: string
  } | null>(null)

  const addGrade = () => {
    setGrades([...grades, { subject: '', score: 0, maxScore: 100, weight: 1 }])
  }

  const removeGrade = (index: number) => {
    if (grades.length > 1) {
      setGrades(grades.filter((_, i) => i !== index))
    }
  }

  const updateGrade = (index: number, field: keyof GradeEntry, value: string | number) => {
    const updatedGrades = grades.map((grade, i) => 
      i === index ? { ...grade, [field]: value } : grade
    )
    setGrades(updatedGrades)
  }

  const calculateGrade = () => {
    const validGrades = grades.filter(grade => 
      grade.subject && grade.score >= 0 && grade.maxScore > 0
    )

    if (validGrades.length === 0) {
      toast.error('Please add at least one grade')
      return
    }

    let totalWeightedScore = 0
    let totalWeight = 0

    validGrades.forEach(grade => {
      const percentage = (grade.score / grade.maxScore) * 100
      totalWeightedScore += percentage * grade.weight
      totalWeight += grade.weight
    })

    if (totalWeight === 0) {
      toast.error('Total weight cannot be zero')
      return
    }

    const finalPercentage = totalWeightedScore / totalWeight
    const gradeInfo = getGradeInfo(finalPercentage, examType)

    setResult({
      totalScore: finalPercentage,
      percentage: finalPercentage,
      grade: gradeInfo.grade,
      level: gradeInfo.level
    })

    toast.success(`Grade calculated: ${gradeInfo.grade} (${finalPercentage.toFixed(1)}%)`)
  }

  const getGradeInfo = (percentage: number, type: string) => {
    if (type === 'igcse') {
      if (percentage >= 90) return { grade: 'A*', level: 'Exceptional' }
      if (percentage >= 80) return { grade: 'A', level: 'Excellent' }
      if (percentage >= 70) return { grade: 'B', level: 'Good' }
      if (percentage >= 60) return { grade: 'C', level: 'Satisfactory' }
      if (percentage >= 50) return { grade: 'D', level: 'Pass' }
      if (percentage >= 40) return { grade: 'E', level: 'Marginal' }
      return { grade: 'F', level: 'Fail' }
    } else if (type === 'sat') {
      if (percentage >= 95) return { grade: '800', level: 'Perfect' }
      if (percentage >= 90) return { grade: '750+', level: 'Excellent' }
      if (percentage >= 80) return { grade: '700+', level: 'Good' }
      if (percentage >= 70) return { grade: '650+', level: 'Average' }
      if (percentage >= 60) return { grade: '600+', level: 'Below Average' }
      return { grade: '<600', level: 'Needs Improvement' }
    } else {
      if (percentage >= 90) return { grade: 'A+', level: 'Excellent' }
      if (percentage >= 80) return { grade: 'A', level: 'Very Good' }
      if (percentage >= 70) return { grade: 'B', level: 'Good' }
      if (percentage >= 60) return { grade: 'C', level: 'Satisfactory' }
      if (percentage >= 50) return { grade: 'D', level: 'Pass' }
      return { grade: 'F', level: 'Fail' }
    }
  }

  const getGradeColor = (level: string) => {
    if (level.includes('Exceptional') || level.includes('Perfect')) return 'bg-green-100 text-green-800'
    if (level.includes('Excellent')) return 'bg-blue-100 text-blue-800'
    if (level.includes('Good')) return 'bg-emerald-100 text-emerald-800'
    if (level.includes('Satisfactory')) return 'bg-yellow-100 text-yellow-800'
    if (level.includes('Pass')) return 'bg-orange-100 text-orange-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Grade Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your IGCSE, SAT, or custom grade scale
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Grade Input
              </CardTitle>
              <CardDescription>
                Add your subjects and scores to calculate your overall grade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Exam Type Selection */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Exam Type:</label>
                <div className="flex gap-2">
                  {[
                    { id: 'igcse', label: 'IGCSE' },
                    { id: 'sat', label: 'SAT' },
                    { id: 'custom', label: 'Custom' }
                  ].map((type) => (
                    <Button
                      key={type.id}
                      variant={examType === type.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setExamType(type.id as any)}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Grades List */}
              <div className="space-y-3">
                {grades.map((grade, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 border rounded-lg">
                    <Input
                      placeholder="Subject"
                      value={grade.subject}
                      onChange={(e) => updateGrade(index, 'subject', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Score"
                      value={grade.score || ''}
                      onChange={(e) => updateGrade(index, 'score', parseFloat(e.target.value) || 0)}
                    />
                    <Input
                      type="number"
                      placeholder="Max Score"
                      value={grade.maxScore || ''}
                      onChange={(e) => updateGrade(index, 'maxScore', parseFloat(e.target.value) || 100)}
                    />
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Weight"
                      value={grade.weight || ''}
                      onChange={(e) => updateGrade(index, 'weight', parseFloat(e.target.value) || 1)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeGrade(index)}
                      disabled={grades.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <Button onClick={addGrade} className="w-full">
                Add Subject
              </Button>

              <Button onClick={calculateGrade} className="w-full" size="lg">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Grade
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Your Grade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {result.grade}
                  </div>
                  <div className="text-2xl font-semibold mb-2">
                    {result.percentage.toFixed(1)}%
                  </div>
                  <Badge className={`${getGradeColor(result.level)} text-sm px-3 py-1`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {result.level}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Subjects:</span>
                    <span className="font-medium">
                      {grades.filter(g => g.subject && g.score > 0).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Score:</span>
                    <span className="font-medium">
                      {grades.filter(g => g.subject && g.score > 0)
                        .reduce((sum, g) => sum + (g.score / g.maxScore * 100), 0) / 
                        grades.filter(g => g.subject && g.score > 0).length || 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Grade Scale Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {examType === 'igcse' && (
                <>
                  <div className="flex justify-between">
                    <span>A* (90-100%):</span>
                    <span className="font-medium">Exceptional</span>
                  </div>
                  <div className="flex justify-between">
                    <span>A (80-89%):</span>
                    <span className="font-medium">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>B (70-79%):</span>
                    <span className="font-medium">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>C (60-69%):</span>
                    <span className="font-medium">Satisfactory</span>
                  </div>
                </>
              )}
              {examType === 'sat' && (
                <>
                  <div className="flex justify-between">
                    <span>800 (95-100%):</span>
                    <span className="font-medium">Perfect</span>
                  </div>
                  <div className="flex justify-between">
                    <span>750+ (90-94%):</span>
                    <span className="font-medium">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>700+ (80-89%):</span>
                    <span className="font-medium">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>650+ (70-79%):</span>
                    <span className="font-medium">Average</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
