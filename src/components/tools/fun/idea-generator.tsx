"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, RefreshCw, Copy, Download, Heart, ChefHat, Dumbbell, BookOpen, Palette } from 'lucide-react'
import { downloadFile } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function IdeaGenerator() {
  const [ideaType, setIdeaType] = useState<'recipe' | 'workout' | 'study' | 'creative'>('recipe')
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  const ideaDatabase = {
    recipe: [
      'Mediterranean Quinoa Bowl with Roasted Vegetables',
      'Spicy Thai Coconut Curry with Tofu',
      'Homemade Pesto Pasta with Cherry Tomatoes',
      'Korean Bibimbap with Gochujang Sauce',
      'Moroccan Tagine with Chickpeas and Apricots',
      'Italian Caprese Salad with Balsamic Glaze',
      'Japanese Miso Ramen with Soft-Boiled Egg',
      'Mexican Street Corn (Elote) with Lime and Chili',
      'Indian Butter Chicken with Basmati Rice',
      'French Ratatouille with Fresh Herbs',
      'Greek Moussaka with Eggplant and Bechamel',
      'Vietnamese Pho with Fresh Herbs and Bean Sprouts',
      'Spanish Paella with Saffron and Seafood',
      'Lebanese Hummus with Pita Bread and Olives',
      'Brazilian Feijoada with Black Beans and Rice'
    ],
    workout: [
      '30-Minute HIIT Cardio Blast',
      'Full Body Strength Training Circuit',
      'Yoga Flow for Flexibility and Balance',
      'Core Strengthening Pilates Session',
      'Dance Cardio Workout Party',
      'Outdoor Running with Interval Training',
      'Bodyweight Exercises for Home Fitness',
      'Swimming Workout for Endurance',
      'Cycling Adventure Route',
      'Boxing Training for Power and Agility',
      'Rock Climbing Indoor Session',
      'Hiking Trail with Scenic Views',
      'Tennis Match for Coordination',
      'Basketball Shooting Practice',
      'Martial Arts Training Session'
    ],
    study: [
      'Create Mind Maps for Complex Topics',
      'Use the Pomodoro Technique (25-min Focus Sessions)',
      'Practice Active Recall with Flashcards',
      'Join Study Groups for Discussion',
      'Teach Concepts to Someone Else',
      'Use Spaced Repetition for Long-term Memory',
      'Create Visual Diagrams and Charts',
      'Record Audio Notes for Review',
      'Use Different Study Environments',
      'Break Down Large Topics into Smaller Chunks',
      'Practice Past Exam Papers',
      'Use Mnemonics for Memorization',
      'Create Study Schedules with Breaks',
      'Use Online Learning Platforms',
      'Form Study Partnerships for Accountability'
    ],
    creative: [
      'Write a Short Story in 100 Words',
      'Paint a Watercolor Landscape',
      'Create a Digital Art Collage',
      'Write Poetry About Your Day',
      'Design a Logo for a Fictional Company',
      'Take Abstract Photography',
      'Create a Handmade Greeting Card',
      'Write a Song or Poem',
      'Design a Dream Garden Layout',
      'Create a Vision Board',
      'Write a Letter to Your Future Self',
      'Sketch Your Dream Home',
      'Create a Personal Brand Identity',
      'Design a Fantasy Map',
      'Write a Creative Recipe'
    ]
  }

  const generateIdeas = () => {
    const ideas = ideaDatabase[ideaType]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
    
    setGeneratedIdeas(ideas)
    toast.success(`${ideas.length} ideas generated!`)
  }

  const addToFavorites = (idea: string) => {
    if (!favorites.includes(idea)) {
      setFavorites(prev => [...prev, idea])
      toast.success('Added to favorites!')
    } else {
      toast.error('Already in favorites!')
    }
  }

  const removeFromFavorites = (idea: string) => {
    setFavorites(prev => prev.filter(fav => fav !== idea))
    toast.success('Removed from favorites!')
  }

  const copyIdea = (idea: string) => {
    navigator.clipboard.writeText(idea)
    toast.success('Idea copied to clipboard!')
  }

  const copyAllIdeas = () => {
    const allIdeas = generatedIdeas.join('\n')
    navigator.clipboard.writeText(allIdeas)
    toast.success('All ideas copied to clipboard!')
  }

  const downloadIdeas = () => {
    const content = generatedIdeas.join('\n')
    downloadFile(content, `${ideaType}-ideas.txt`, 'text/plain')
    toast.success('Ideas downloaded!')
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recipe': return ChefHat
      case 'workout': return Dumbbell
      case 'study': return BookOpen
      case 'creative': return Palette
      default: return Lightbulb
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recipe': return 'bg-orange-100 text-orange-800'
      case 'workout': return 'bg-green-100 text-green-800'
      case 'study': return 'bg-blue-100 text-blue-800'
      case 'creative': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeDescription = (type: string) => {
    switch (type) {
      case 'recipe': return 'Culinary inspiration and cooking ideas'
      case 'workout': return 'Fitness routines and exercise plans'
      case 'study': return 'Learning strategies and study techniques'
      case 'creative': return 'Artistic projects and creative endeavors'
      default: return 'Random creative ideas'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Random Idea Generator</h1>
        <p className="text-muted-foreground">
          Get random ideas for recipes, workouts, study plans, and creative projects
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Idea Generator
            </CardTitle>
            <CardDescription>
              Choose the type of ideas to generate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Idea Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Idea Type:</label>
              <div className="space-y-2">
                {[
                  { id: 'recipe', label: 'Recipes', icon: ChefHat, description: 'Cooking inspiration' },
                  { id: 'workout', label: 'Workouts', icon: Dumbbell, description: 'Fitness routines' },
                  { id: 'study', label: 'Study Plans', icon: BookOpen, description: 'Learning strategies' },
                  { id: 'creative', label: 'Creative', icon: Palette, description: 'Artistic projects' }
                ].map((type) => {
                  const Icon = type.icon
                  return (
                    <Button
                      key={type.id}
                      variant={ideaType === type.id ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setIdeaType(type.id as any)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </div>

            <Button onClick={generateIdeas} className="w-full" size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Ideas
            </Button>

            {generatedIdeas.length > 0 && (
              <div className="space-y-2">
                <Button onClick={copyAllIdeas} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </Button>
                <Button onClick={downloadIdeas} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generated Ideas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className={getTypeColor(ideaType)}>
                {ideaType.toUpperCase()}
              </Badge>
              Generated Ideas
            </CardTitle>
            <CardDescription>
              {generatedIdeas.length} ideas generated
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedIdeas.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click "Generate Ideas" to see random ideas here.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {generatedIdeas.map((idea, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="font-medium text-sm">{idea}</span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyIdea(idea)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToFavorites(idea)}
                        disabled={favorites.includes(idea)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Favorites */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-red-500">♥</span>
              Favorites
            </CardTitle>
            <CardDescription>
              {favorites.length} favorite ideas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {favorites.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <span className="text-red-500 text-2xl mb-2 block">♥</span>
                <p>No favorites yet. Click the heart icon to add ideas to favorites.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {favorites.map((idea, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="font-medium text-sm">{idea}</span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyIdea(idea)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromFavorites(idea)}
                        className="text-red-600 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Idea Categories Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Idea Categories</CardTitle>
          <CardDescription>
            Understanding different types of generated ideas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <ChefHat className="h-4 w-4" />
                Recipes
              </h4>
              <p className="text-xs text-muted-foreground">
                Culinary inspiration from around the world. Perfect for meal planning and cooking adventures.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                Workouts
              </h4>
              <p className="text-xs text-muted-foreground">
                Fitness routines and exercise plans. Great for staying active and building healthy habits.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Study Plans
              </h4>
              <p className="text-xs text-muted-foreground">
                Learning strategies and study techniques. Helpful for academic success and skill development.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Creative
              </h4>
              <p className="text-xs text-muted-foreground">
                Artistic projects and creative endeavors. Perfect for unleashing your creative potential.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
