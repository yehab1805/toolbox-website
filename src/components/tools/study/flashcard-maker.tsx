"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Plus, Trash2, RotateCcw, Download, Eye, EyeOff } from 'lucide-react'
import { Flashcard } from '@/types'
import { generateId, downloadFile } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function FlashcardMaker() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { id: generateId(), front: '', back: '', category: '' }
  ])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [studyMode, setStudyMode] = useState(false)

  const addFlashcard = () => {
    setFlashcards([...flashcards, { id: generateId(), front: '', back: '', category: '' }])
  }

  const removeFlashcard = (id: string) => {
    if (flashcards.length > 1) {
      setFlashcards(flashcards.filter(card => card.id !== id))
      if (currentIndex >= flashcards.length - 1) {
        setCurrentIndex(Math.max(0, currentIndex - 1))
      }
    }
  }

  const updateFlashcard = (id: string, field: keyof Flashcard, value: string) => {
    setFlashcards(flashcards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ))
  }

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setIsFlipped(false)
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const exportFlashcards = () => {
    const validCards = flashcards.filter(card => card.front && card.back)
    if (validCards.length === 0) {
      toast.error('No valid flashcards to export')
      return
    }

    const exportData = {
      flashcards: validCards,
      exportDate: new Date().toISOString(),
      totalCards: validCards.length
    }

    downloadFile(JSON.stringify(exportData, null, 2), 'flashcards.json', 'application/json')
    toast.success('Flashcards exported successfully!')
  }

  const exportAsText = () => {
    const validCards = flashcards.filter(card => card.front && card.back)
    if (validCards.length === 0) {
      toast.error('No valid flashcards to export')
      return
    }

    let textContent = 'Flashcards Export\n================\n\n'
    validCards.forEach((card, index) => {
      textContent += `Card ${index + 1}:\n`
      textContent += `Front: ${card.front}\n`
      textContent += `Back: ${card.back}\n`
      if (card.category) {
        textContent += `Category: ${card.category}\n`
      }
      textContent += '\n'
    })

    downloadFile(textContent, 'flashcards.txt', 'text/plain')
    toast.success('Flashcards exported as text!')
  }

  const validCards = flashcards.filter(card => card.front && card.back)
  const currentCard = flashcards[currentIndex]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Flashcard Maker</h1>
        <p className="text-muted-foreground">
          Create and study flashcards for effective learning
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flashcard Editor */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Create Flashcards
              </CardTitle>
              <CardDescription>
                Add your study material to create flashcards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {flashcards.map((card, index) => (
                <div key={card.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Card {index + 1}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFlashcard(card.id)}
                      disabled={flashcards.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Input
                    placeholder="Category (optional)"
                    value={card.category}
                    onChange={(e) => updateFlashcard(card.id, 'category', e.target.value)}
                  />
                  
                  <Textarea
                    placeholder="Front of card (question/prompt)"
                    value={card.front}
                    onChange={(e) => updateFlashcard(card.id, 'front', e.target.value)}
                    className="min-h-[80px]"
                  />
                  
                  <Textarea
                    placeholder="Back of card (answer/explanation)"
                    value={card.back}
                    onChange={(e) => updateFlashcard(card.id, 'back', e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              ))}

              <Button onClick={addFlashcard} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Flashcard
              </Button>

              <div className="flex gap-2">
                <Button onClick={exportFlashcards} variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export JSON
                </Button>
                <Button onClick={exportAsText} variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export Text
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Study Mode */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Study Mode
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {validCards.length} cards
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStudyMode(!studyMode)}
                  >
                    {studyMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {studyMode ? 'Exit Study' : 'Study Mode'}
                  </Button>
                </div>
              </div>
              <CardDescription>
                Practice with your flashcards
              </CardDescription>
            </CardHeader>
            <CardContent>
              {validCards.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Create some flashcards to start studying!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Progress */}
                  <div className="flex items-center justify-between text-sm">
                    <span>Card {currentIndex + 1} of {validCards.length}</span>
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${((currentIndex + 1) / validCards.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Flashcard Display */}
                  <div className="relative">
                    <div 
                      className={`bg-card border-2 rounded-lg p-8 min-h-[300px] flex items-center justify-center transition-all duration-500 transform ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                      style={{ 
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                      }}
                    >
                      <div className="text-center space-y-4">
                        {currentCard && (
                          <>
                                <div className="text-sm text-muted-foreground mb-2">
                                  {currentCard.category && (
                                    <Badge variant="outline" className="mb-2">
                                      {currentCard.category}
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-lg font-medium">
                                  {isFlipped ? currentCard.back : currentCard.front}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {isFlipped ? 'Answer' : 'Question'}
                                </div>
                              </>
                            )}
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" onClick={prevCard}>
                      Previous
                    </Button>
                    <Button onClick={flipCard} size="lg">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      {isFlipped ? 'Show Question' : 'Show Answer'}
                    </Button>
                    <Button variant="outline" onClick={nextCard}>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
