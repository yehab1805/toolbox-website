# ToolBox - All-in-One Digital Toolbox

A comprehensive collection of 25+ free online tools designed for students, professionals, and everyday users. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### Study & Education Tools
- **GPA Calculator** - Calculate GPA with weighted and unweighted scales
- **Grade Calculator** - IGCSE/SAT grade calculator with multiple scales
- **Citation Generator** - Generate APA, MLA, and Harvard citations
- **Flashcard Maker** - Create and export flashcards for studying
- **Math Solver** - Simple rule-based math problem solver

### Business & Productivity Tools
- **Invoice Generator** - Create professional invoices and export to PDF
- **To-Do List** - Organize tasks with priority levels and notes
- **Expense Tracker** - Track expenses with categories and reports
- **Text/CSV to PDF** - Convert text files and CSV data to PDF format
- **QR Code Generator** - Generate QR codes for URLs, text, and contact info

### Fun & Creative Tools
- **Meme Generator** - Create memes by adding text to images
- **Random Name Generator** - Generate baby names, Wi-Fi names, and startup names
- **Random Password Generator** - Generate secure random passwords
- **Random Idea Generator** - Get random ideas for recipes, workouts, and study plans

### Utility & Everyday Tools
- **Unit Converter** - Convert between different units of measurement
- **Currency Converter** - Convert between different currencies
- **Mortgage Calculator** - Calculate mortgage and loan payments
- **BMI Calculator** - Calculate Body Mass Index and health metrics
- **Calorie Calculator** - Calculate daily calorie needs and burn rates

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/toolbox-website.git
cd toolbox-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── tools/             # Tool pages
│   │   ├── study/         # Study tools
│   │   ├── business/      # Business tools
│   │   ├── fun/           # Fun tools
│   │   └── utility/       # Utility tools
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy policy
│   └── terms/             # Terms of service
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── tools/             # Tool-specific components
│   ├── navigation.tsx     # Navigation component
│   ├── footer.tsx         # Footer component
│   └── theme-provider.tsx # Theme provider
├── lib/                   # Utility functions
│   ├── tools.ts           # Tool definitions
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript type definitions
```

## 🎨 Design System

The project uses a custom design system built on Tailwind CSS with:

- **Colors**: Custom color palette with dark/light mode support
- **Typography**: Inter font family with consistent sizing
- **Components**: Reusable UI components with consistent styling
- **Icons**: Lucide React icon library
- **Animations**: Smooth transitions and hover effects

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Next.js build command
- **Railway**: Deploy with zero configuration
- **Heroku**: Use the Next.js buildpack
- **AWS**: Use AWS Amplify or Elastic Beanstalk

## 🔒 Privacy & Security

- **No Data Collection**: All processing happens locally in the browser
- **No Tracking**: No analytics or user tracking
- **No Registration**: No accounts or user data storage
- **Open Source**: Transparent codebase for security review

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icon library
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](https://toolbox.com/docs)
2. Search [existing issues](https://github.com/your-username/toolbox-website/issues)
3. Create a [new issue](https://github.com/your-username/toolbox-website/issues/new)
4. Contact us at [hello@toolbox.com](mailto:hello@toolbox.com)

---

Made with ❤️ for students and professionals worldwide.