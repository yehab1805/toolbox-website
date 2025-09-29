import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Settings, Users, Zap, Shield, Globe, Heart } from 'lucide-react'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: "About ToolBox - Your Ultimate Digital Toolbox",
  description: "Learn about ToolBox, a comprehensive collection of 25+ free online tools for students, professionals, and everyday users. No registration required, no hidden costs.",
  path: "/about",
  keywords: ["about toolbox", "free online tools", "digital toolbox", "productivity tools", "study tools", "business tools"]
});

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Settings className="h-6 w-6" />
              </div>
              <span className="text-3xl font-bold">ToolBox</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">
              Your Ultimate Digital Toolbox
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive collection of 25+ free online tools designed for students, 
              professionals, and everyday users. No registration required, no hidden costs.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>For Everyone</CardTitle>
                </div>
                <CardDescription>
                  Tools designed for students, professionals, and everyday users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Whether you're a student calculating GPA, a business owner creating invoices, 
                  or someone looking for creative inspiration, our tools are designed for everyone.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <CardTitle>Lightning Fast</CardTitle>
                </div>
                <CardDescription>
                  Instant results with no waiting or processing delays
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All our tools are optimized for speed and performance. Get your results 
                  instantly without any unnecessary delays or loading times.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>100% Secure</CardTitle>
                </div>
                <CardDescription>
                  Your data stays private and secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We don't collect, store, or share your personal data. All calculations 
                  and processing happen locally in your browser for maximum privacy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <CardTitle>Always Free</CardTitle>
                </div>
                <CardDescription>
                  No hidden costs, no premium tiers, no subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every tool on our platform is completely free to use. No registration 
                  required, no credit card needed, no hidden fees.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <CardTitle>Easy to Use</CardTitle>
                </div>
                <CardDescription>
                  Intuitive interfaces designed for simplicity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our tools feature clean, intuitive interfaces that anyone can use. 
                  No complex setup or learning curve required.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <CardTitle>Made with Love</CardTitle>
                </div>
                <CardDescription>
                  Built by developers who care about user experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every tool is carefully crafted with attention to detail and user 
                  experience. We're constantly improving and adding new features.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tool Categories */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Tool Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">Study</Badge>
                    Study & Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• GPA Calculator</li>
                    <li>• Grade Calculator</li>
                    <li>• Citation Generator</li>
                    <li>• Flashcard Maker</li>
                    <li>• Math Solver</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Business</Badge>
                    Business & Productivity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Invoice Generator</li>
                    <li>• To-Do List</li>
                    <li>• Expense Tracker</li>
                    <li>• QR Code Generator</li>
                    <li>• Text to PDF</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-800">Fun</Badge>
                    Fun & Creative
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Meme Generator</li>
                    <li>• Name Generator</li>
                    <li>• Password Generator</li>
                    <li>• Random Idea Generator</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-orange-100 text-orange-800">Utility</Badge>
                    Utility & Everyday
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Unit Converter</li>
                    <li>• Currency Converter</li>
                    <li>• BMI Calculator</li>
                    <li>• Mortgage Calculator</li>
                    <li>• Calorie Calculator</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Free Tools</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free to Use</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Registration Required</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
            <p className="text-muted-foreground">
              Explore our collection of free tools and find the perfect solution for your needs.
            </p>
            <div className="flex justify-center">
              <a 
                href="/" 
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Explore All Tools
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
