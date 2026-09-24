# CET-6 词汇学习站 | CET-6 Vocabulary Study Site

A lightweight, static CET-6 (College English Test - Band 6) vocabulary study application with flashcards, quizzes, and progress tracking.

为女朋友准备的六级词汇学习小站 💕

## Features | 功能特点

- 🎴 **Flashcards 单词卡片** - Flip cards to learn vocabulary with phonetics and example sentences
- 📝 **Quiz Mode 词汇测验** - Multiple choice quizzes to test your knowledge
- 📊 **Progress Tracking 进度追踪** - Local storage saves your learning progress
- 🎯 **100+ CET-6 Words** - High-frequency vocabulary for the exam
- 📱 **Responsive Design** - Works on desktop and mobile
- 🚀 **No Backend Required** - Pure static site, deploy anywhere

## Quick Start | 快速开始

### Option 1: Using Vite (Recommended for Development)

```bash
cd cet6-study-site

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:3000` in your browser.

### Option 2: Using Any Static Server

Since this is a pure static site with ES modules, you can use any static file server:

```bash
cd cet6-study-site

# Using Python
python -m http.server 3000

# Using Node.js serve (install globally first: npm i -g serve)
npx serve .

# Using PHP
php -S localhost:3000
```

### Option 3: Direct Open (Modern Browsers)

Modern browsers may have CORS restrictions for ES modules loaded from `file://`. 
For best results, use a local server as described above.

## Project Structure | 项目结构

```
cet6-study-site/
├── index.html              # Main HTML file
├── package.json            # npm configuration
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.js             # Main application logic
│   ├── styles/
│   │   └── main.css        # All styles
│   ├── data/
│   │   └── vocabulary.js   # CET-6 word list (100+ words)
│   └── utils/
│       └── storage.js      # localStorage utilities
└── public/                 # Static assets (if any)
```

## Deployment | 部署

### Static Hosting (GitHub Pages, Netlify, Vercel)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting service.

### Netlify One-Click

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### Vercel

```bash
npx vercel
```

## Keyboard Shortcuts | 快捷键

When on the flashcard page:
- `←` / `→` - Navigate between cards
- `Space` / `Enter` - Flip card

## Data Storage | 数据存储

All learning progress is stored in browser's localStorage:
- Word learning status (new/learning/mastered)
- Quiz history and scores
- Study streak

No account or server required. Your data stays on your device.

## Customization | 自定义

### Adding More Words

Edit `src/data/vocabulary.js` to add more vocabulary:

```javascript
{ 
  word: "example", 
  phonetic: "/ɪɡˈzæmpl/", 
  translation: "n. 例子", 
  example: "This is an example sentence." 
}
```

### Theming

Modify CSS variables in `src/styles/main.css`:

```css
:root {
  --primary: #6366f1;
  --secondary: #10b981;
  /* ... more variables */
}
```

## Technology Stack | 技术栈

- **Vanilla JavaScript** - No framework dependencies
- **Vite** - Fast build tool (optional, for development)
- **CSS3** - Modern styling with CSS Grid/Flexbox
- **localStorage** - Client-side data persistence

## License

MIT - Feel free to use and modify for your own learning purposes!

---

加油！六级一定能过！💪📚
