const fs = require('fs');
const path = require('path');

// Read the tools data
const toolsData = require('../src/lib/tools.ts');

// Function to update a tool page with SEO metadata
function updateToolPage(tool) {
  const toolPath = tool.path.replace('/tools/', '');
  const pathParts = toolPath.split('/');
  const category = pathParts[0];
  const toolId = pathParts[1];
  
  const pagePath = path.join(__dirname, '..', 'src', 'app', 'tools', category, toolId, 'page.tsx');
  
  if (fs.existsSync(pagePath)) {
    const existingContent = fs.readFileSync(pagePath, 'utf8');
    
    // Check if metadata is already added
    if (existingContent.includes('generateToolMetadata')) {
      console.log(`✅ ${tool.name} - SEO metadata already exists`);
      return;
    }
    
    // Add SEO imports and metadata
    const lines = existingContent.split('\n');
    const importLines = [];
    const otherLines = [];
    let inImports = true;
    
    for (const line of lines) {
      if (inImports && (line.startsWith('import ') || line.trim() === '')) {
        importLines.push(line);
      } else {
        inImports = false;
        otherLines.push(line);
      }
    }
    
    // Add SEO imports
    const seoImports = [
      "import { generateToolMetadata } from '@/lib/seo'",
      "import { tools } from '@/lib/tools'",
      "",
      "export const metadata = generateToolMetadata(",
      `  tools.find(tool => tool.id === '${toolId}')!`,
      ")",
      ""
    ];
    
    const newContent = [
      ...importLines,
      ...seoImports,
      ...otherLines
    ].join('\n');
    
    fs.writeFileSync(pagePath, newContent);
    console.log(`✅ ${tool.name} - SEO metadata added`);
  } else {
    console.log(`❌ ${tool.name} - Page not found at ${pagePath}`);
  }
}

// Update all tool pages
console.log('🚀 Updating tool pages with SEO metadata...\n');

toolsData.tools.forEach(tool => {
  updateToolPage(tool);
});

console.log('\n✨ SEO metadata update complete!');
console.log('\n📋 Next steps:');
console.log('1. Update domain URLs in seo.ts, sitemap.ts, robots.ts, and layout.tsx');
console.log('2. Add your Google verification code');
console.log('3. Add analytics IDs');
console.log('4. Create og-image.png for social sharing');
console.log('5. Submit sitemap to Google Search Console');
