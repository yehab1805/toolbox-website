import GPACalculator from '@/components/tools/study/gpa-calculator'
import { generateToolMetadata } from '@/lib/seo'
import { tools } from '@/lib/tools'

export const metadata = generateToolMetadata(
  tools.find(tool => tool.id === 'gpa-calculator')!
)

export default function GPACalculatorPage() {
  return <GPACalculator />
}
