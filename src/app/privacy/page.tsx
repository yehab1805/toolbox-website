import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, Lock, Database, Globe } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">
              Privacy Policy
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we protect your data and respect your privacy.
            </p>
          </div>

          {/* Privacy Principles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-primary" />
                  <CardTitle>No Tracking</CardTitle>
                </div>
                <CardDescription>
                  We don't track your usage or behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We don't use tracking cookies, analytics, or any other methods to monitor your activity on our site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <CardTitle>Local Processing</CardTitle>
                </div>
                <CardDescription>
                  All calculations happen in your browser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your data never leaves your device. All tool processing happens locally in your browser for maximum privacy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-primary" />
                  <CardTitle>No Data Collection</CardTitle>
                </div>
                <CardDescription>
                  We don't collect or store your information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We don't collect, store, or share any personal information. Your data stays with you.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Privacy Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Information We Don't Collect</CardTitle>
                <CardDescription>
                  We believe in privacy by design
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Personal Information</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• No names or email addresses</li>
                      <li>• No phone numbers or addresses</li>
                      <li>• No account information</li>
                      <li>• No payment details</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Usage Data</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• No browsing history</li>
                      <li>• No tool usage statistics</li>
                      <li>• No session data</li>
                      <li>• No analytics or tracking</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How Our Tools Work</CardTitle>
                <CardDescription>
                  Understanding our privacy-first approach
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Local Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        All calculations and data processing happen entirely in your browser using JavaScript.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">No Server Communication</h4>
                      <p className="text-sm text-muted-foreground">
                        Your data never leaves your device. No information is sent to our servers.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Immediate Results</h4>
                      <p className="text-sm text-muted-foreground">
                        You get instant results without any data transmission or storage.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookies and Tracking</CardTitle>
                <CardDescription>
                  Our minimal approach to web technologies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Essential Cookies Only</h4>
                  <p className="text-sm text-muted-foreground">
                    We only use essential cookies for basic website functionality, such as remembering your theme preference (dark/light mode).
                  </p>
                  
                  <h4 className="font-semibold">No Third-Party Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    We don't use Google Analytics, Facebook Pixel, or any other third-party tracking services.
                  </p>
                  
                  <h4 className="font-semibold">No Advertising</h4>
                  <p className="text-sm text-muted-foreground">
                    We don't show ads or use advertising networks that might track you across the web.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
                <CardDescription>
                  You have complete control over your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Data Control</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Your data never leaves your device</li>
                      <li>• No data to delete or modify</li>
                      <li>• No accounts to manage</li>
                      <li>• Complete privacy by default</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Transparency</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Open source code available</li>
                      <li>• Clear privacy practices</li>
                      <li>• No hidden data collection</li>
                      <li>• Regular privacy updates</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Questions About Privacy?
              </CardTitle>
              <CardDescription>
                We're committed to transparency and privacy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any questions about our privacy practices or this policy, 
                please don't hesitate to contact us. We're committed to being transparent 
                about how we protect your privacy.
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Contact us:</span>
                <span className="text-sm text-muted-foreground">privacy@toolbox.com</span>
              </div>
            </CardContent>
          </Card>

          {/* Last Updated */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>This privacy policy may be updated from time to time. We'll notify you of any significant changes.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
