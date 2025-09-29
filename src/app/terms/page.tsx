import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">
              Terms of Service
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple terms for using our free tools. No complicated legal jargon.
            </p>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <CardTitle>Free to Use</CardTitle>
                </div>
                <CardDescription>
                  All tools are completely free
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You can use all our tools without any cost, registration, or hidden fees.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <CardTitle>Privacy First</CardTitle>
                </div>
                <CardDescription>
                  Your data stays with you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All processing happens locally in your browser. We don't collect or store your data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <CardTitle>Use Responsibly</CardTitle>
                </div>
                <CardDescription>
                  Please use our tools appropriately
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use our tools for legitimate purposes and respect others' intellectual property.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Terms */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
                <CardDescription>
                  By using our website, you agree to these terms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  By accessing and using ToolBox, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Use License</CardTitle>
                <CardDescription>
                  How you can use our tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Permitted Uses</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Personal and educational use</li>
                    <li>• Business and professional use</li>
                    <li>• Commercial use (with attribution)</li>
                    <li>• Integration into your own projects</li>
                  </ul>
                  
                  <h4 className="font-semibold">Prohibited Uses</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Illegal or harmful activities</li>
                    <li>• Spam or abuse of our services</li>
                    <li>• Attempting to break or hack our tools</li>
                    <li>• Violating others' rights or privacy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disclaimer</CardTitle>
                <CardDescription>
                  Important information about our tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Tool Accuracy</h4>
                  <p className="text-sm text-muted-foreground">
                    While we strive for accuracy, our tools are provided "as is" without warranties. 
                    Always verify important calculations and consult professionals when needed.
                  </p>
                  
                  <h4 className="font-semibold">No Guarantees</h4>
                  <p className="text-sm text-muted-foreground">
                    We don't guarantee that our tools will be error-free, secure, or continuously available. 
                    Use them at your own discretion.
                  </p>
                  
                  <h4 className="font-semibold">Professional Advice</h4>
                  <p className="text-sm text-muted-foreground">
                    Our tools are for informational purposes only. For important decisions, 
                    consult with qualified professionals.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
                <CardDescription>
                  Our responsibility to you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  ToolBox and its creators shall not be liable for any direct, indirect, incidental, 
                  special, consequential, or punitive damages resulting from your use of our tools. 
                  This includes but is not limited to loss of profits, data, or business opportunities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
                <CardDescription>
                  Rights and ownership
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Our Rights</h4>
                  <p className="text-sm text-muted-foreground">
                    The ToolBox website, including its design, code, and content, is protected by copyright 
                    and other intellectual property laws.
                  </p>
                  
                  <h4 className="font-semibold">Your Rights</h4>
                  <p className="text-sm text-muted-foreground">
                    You retain all rights to any data, content, or results you create using our tools. 
                    We don't claim ownership of your work.
                  </p>
                  
                  <h4 className="font-semibold">Open Source</h4>
                  <p className="text-sm text-muted-foreground">
                    Many of our tools are open source and available under permissive licenses. 
                    Check individual tool pages for specific licensing information.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
                <CardDescription>
                  How we handle updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We reserve the right to modify these terms at any time. We'll notify users of any 
                  significant changes through our website. Continued use of our services after changes 
                  constitutes acceptance of the new terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Questions about these terms?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm text-muted-foreground">legal@toolbox.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Website:</span>
                    <span className="text-sm text-muted-foreground">toolbox.com/contact</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Last Updated */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>These terms are effective as of the date of last update.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
