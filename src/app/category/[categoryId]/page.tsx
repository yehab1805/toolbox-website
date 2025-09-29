import { notFound } from 'next/navigation'
import { categories } from '@/lib/tools'
import { generateCategoryMetadata } from '@/lib/seo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  BookOpen, 
  Briefcase, 
  File, 
  Heart, 
  Settings,
  Calculator,
  GraduationCap,
  FileText,
  CreditCard,
  FunctionSquare,
  Receipt,
  CheckSquare,
  TrendingUp,
  FileDown,
  QrCode,
  FilePlus,
  FileMinus,
  Archive,
  Lock,
  Image,
  Maximize,
  Video,
  Smile,
  Users,
  Key,
  Lightbulb,
  Ruler,
  DollarSign,
  Home,
  Activity,
  Zap
} from 'lucide-react'

interface CategoryPageProps {
  params: {
    categoryId: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(cat => cat.id === params.categoryId)
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    }
  }

  return generateCategoryMetadata(category)
}

const iconMap = {
  BookOpen,
  Briefcase,
  File,
  Heart,
  Settings
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(cat => cat.id === params.categoryId)
  
  if (!category) {
    notFound()
  }

  const Icon = iconMap[category.icon as keyof typeof iconMap]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {Icon && <Icon className="h-8 w-8" />}
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {category.description}
          </p>
          <Badge variant="secondary" className="mt-4">
            {category.tools.length} Tools Available
          </Badge>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.tools.map((tool) => {
            const iconMap = {
              Calculator,
              GraduationCap,
              FileText,
              CreditCard,
              FunctionSquare,
              Receipt,
              CheckSquare,
              TrendingUp,
              FileDown,
              QrCode,
              FilePlus,
              FileMinus,
              Archive,
              Lock,
              Image,
              Maximize,
              Video,
              Smile,
              Users,
              Key,
              Lightbulb,
              Ruler,
              DollarSign,
              Home,
              Activity,
              Zap
            }
            
            const ToolIcon = iconMap[tool.icon as keyof typeof iconMap]
            
            return (
              <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {ToolIcon && <ToolIcon className="h-5 w-5" />}
                    </div>
                    {tool.featured && (
                      <Badge variant="default" className="text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {category.name}
                    </Badge>
                    <Button asChild size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link href={tool.path}>
                        Use Tool
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <Link href="/">
              ← Back to All Tools
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
