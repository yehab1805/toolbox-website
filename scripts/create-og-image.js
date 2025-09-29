const fs = require('fs');
const path = require('path');

// Create a simple HTML file that can be used to generate OG image
const ogImageHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>ToolBox OG Image</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            width: 1200px;
            height: 630px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .container {
            text-align: center;
            color: white;
            padding: 40px;
        }
        .logo {
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 20px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .tagline {
            font-size: 24px;
            margin-bottom: 30px;
            opacity: 0.9;
        }
        .tools-count {
            font-size: 18px;
            background: rgba(255,255,255,0.2);
            padding: 10px 20px;
            border-radius: 25px;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🛠️ ToolBox</div>
        <div class="tagline">All-in-One Digital Toolbox</div>
        <div class="tools-count">25+ Free Online Tools</div>
    </div>
</body>
</html>
`;

// Write the HTML file
const htmlPath = path.join(__dirname, '..', 'public', 'og-image.html');
fs.writeFileSync(htmlPath, ogImageHTML);

console.log('✅ Created og-image.html in public folder');
console.log('📋 To generate the actual PNG:');
console.log('1. Open public/og-image.html in a browser');
console.log('2. Take a screenshot at 1200x630px');
console.log('3. Save as public/og-image.png');
console.log('4. Or use a tool like Puppeteer to automate this process');
