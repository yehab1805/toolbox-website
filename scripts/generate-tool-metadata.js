const fs = require('fs');
const path = require('path');

// Tool metadata template
const toolPageTemplate = `import { generateToolMetadata } from '@/lib/seo'
import { tools } from '@/lib/tools'

export const metadata = generateToolMetadata(
  tools.find(tool => tool.id === 'TOOL_ID')!
)

export default function TOOL_NAMEPage() {
  return <TOOL_COMPONENT />
}`;

// Read the tools data
const toolsData = require('../src/lib/tools.ts');

// Function to convert kebab-case to PascalCase
function toPascalCase(str) {
  return str.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
}

// Function to convert kebab-case to camelCase
function toCamelCase(str) {
  return str.split('-').map((word, index) => 
    index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
}

// Generate metadata for all tools
toolsData.tools.forEach(tool => {
  const toolPath = tool.path.replace('/tools/', '');
  const pathParts = toolPath.split('/');
  const category = pathParts[0];
  const toolId = pathParts[1];
  
  const componentName = toPascalCase(toolId);
  const pageName = `${componentName}Page`;
  
  const pageContent = toolPageTemplate
    .replace(/TOOL_ID/g, toolId)
    .replace(/TOOL_NAME/g, componentName)
    .replace(/TOOL_COMPONENT/g, componentName);
  
  const pagePath = path.join(__dirname, '..', 'src', 'app', 'tools', category, toolId, 'page.tsx');
  
  // Check if page exists and doesn't already have metadata
  if (fs.existsSync(pagePath)) {
    const existingContent = fs.readFileSync(pagePath, 'utf8');
    if (!existingContent.includes('generateToolMetadata')) {
      console.log(`Adding metadata to ${pagePath}`);
      // Add import and metadata to existing file
      const lines = existingContent.split('\n');
      const importIndex = lines.findIndex(line => line.includes('import') && line.includes('from'));
      const newLines = [
        ...lines.slice(0, importIndex),
        "import { generateToolMetadata } from '@/lib/seo'",
        "import { tools } from '@/lib/tools'",
        "",
        "export const metadata = generateToolMetadata(",
        `  tools.find(tool => tool.id === '${toolId}')!`,
        ")",
        "",
        ...lines.slice(importIndex)
      ];
      fs.writeFileSync(pagePath, newLines.join('\n'));
    }
  }
});

console.log('Tool metadata generation complete!');
