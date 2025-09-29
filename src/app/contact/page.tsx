import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MessageSquare, Github, Twitter, Heart } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Get in Touch
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  We'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="What's this about?" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Tell us what's on your mind..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">hello@toolbox.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Github className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">GitHub</div>
                      <div className="text-sm text-muted-foreground">github.com/toolbox</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Twitter className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Twitter</div>
                      <div className="text-sm text-muted-foreground">@toolbox</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm">Is ToolBox really free?</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Yes! All our tools are completely free to use with no hidden costs or premium tiers.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm">Do I need to register?</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      No registration required. You can use all tools immediately without creating an account.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm">Is my data secure?</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Absolutely. All processing happens locally in your browser. We don't collect or store your data.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm">Can I suggest new tools?</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Yes! We love hearing your ideas. Send us your suggestions through the contact form.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Support Our Mission
              </CardTitle>
              <CardDescription>
                Help us keep ToolBox free and accessible for everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-2xl">⭐</div>
                  <h3 className="font-semibold">Star on GitHub</h3>
                  <p className="text-sm text-muted-foreground">
                    Show your support by starring our repository
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl">🐛</div>
                  <h3 className="font-semibold">Report Bugs</h3>
                  <p className="text-sm text-muted-foreground">
                    Help us improve by reporting any issues you find
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl">💡</div>
                  <h3 className="font-semibold">Suggest Features</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your ideas for new tools and improvements
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
