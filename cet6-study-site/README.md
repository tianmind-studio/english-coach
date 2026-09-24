# CET-6 备考助手 | CET-6 Study Helper

A comprehensive, lightweight CET-6 (College English Test - Band 6) study application with vocabulary flashcards, reading comprehension, writing practice, quizzes, and progress tracking.

为女朋友准备的六级备考助手 💕

## Features | 功能特点

### 🎴 Vocabulary Flashcards 单词卡片
- Flip cards to learn vocabulary with phonetics and example sentences
- Mark words as "new", "learning", or "mastered"
- Filter cards by learning status
- Keyboard navigation (← → Space/Enter)
- 100+ high-frequency CET-6 words

### 📝 Vocabulary Quiz 词汇测验
- Multiple choice quizzes (10/20/30/50 questions)
- Immediate feedback on answers
- Score tracking and result summary

### 📖 Reading Comprehension 阅读理解
- 3 CET-6 style passages with varying difficulty
- 5 comprehension questions per passage
- Answer explanations in Chinese
- Progress tracking for completed passages

### ✍️ Writing Practice 写作练习
- 10 essay prompts covering common CET-6 topics
- Local draft saving with auto-save
- Word count tracking (target: 150-200 words)
- Self-assessment rubric checklist with 16 criteria across 4 categories:
  - Content & Ideas (内容与观点)
  - Structure & Organization (结构与组织)
  - Language & Expression (语言与表达)
  - Format & Conventions (格式与规范)

### 📊 Learning Dashboard 学习面板
- Study streak counter with motivational messages
- Visual progress ring showing vocabulary mastery
- Quiz history with scores
- Weak words list (words marked as "learning")
- Reading and writing progress overview

### 💾 Progress Tracking 进度追踪
- All progress saved to localStorage
- No account or server required
- Data stays on your device

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

```bash
cd cet6-study-site

# Using Python
python -m http.server 3000

# Using Node.js serve
npx serve .

# Using PHP
php -S localhost:3000
```

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
│   │   ├── vocabulary.js   # CET-6 word list (100+ words)
│   │   ├── reading.js      # Reading passages (3 articles)
│   │   └── writing.js      # Writing prompts (10 topics) + rubric
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

## Content Overview | 内容概览

### Vocabulary (100+ words)
High-frequency CET-6 vocabulary including:
- Academic verbs (abolish, accommodate, acknowledge, etc.)
- Adjectives (absurd, abundant, acute, etc.)
- Nouns (accommodation, acquisition, allegiance, etc.)

### Reading Passages (3 articles)
1. **The Future of Remote Work** (中等难度, 280词)
2. **Artificial Intelligence in Healthcare** (较难, 310词)
3. **Sustainable Urban Development** (中等难度, 295词)

### Writing Prompts (10 topics)
1. Technology and Daily Life (科技与生活)
2. Educational Equality (教育公平)
3. Environmental Protection (环境保护)
4. Career Choices (职业选择)
5. Tradition vs. Modernity (传统与现代)
6. Social Media (社交媒体)
7. Globalization (全球化)
8. Healthy Lifestyle (健康生活)
9. Lifelong Learning (终身学习)
10. Artificial Intelligence (人工智能)

## Customization | 自定义

### Adding More Words

Edit `src/data/vocabulary.js`:

```javascript
{ 
  word: "example", 
  phonetic: "/ɪɡˈzæmpl/", 
  translation: "n. 例子", 
  example: "This is an example sentence." 
}
```

### Adding Reading Passages

Edit `src/data/reading.js`:

```javascript
{
  id: 4,
  title: "Your Passage Title",
  difficulty: "中等",
  wordCount: 300,
  passage: "Your passage text...",
  questions: [
    {
      id: 1,
      question: "Question text?",
      options: ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
      correctAnswer: 0,
      explanation: "解释..."
    }
  ]
}
```

### Adding Writing Prompts

Edit `src/data/writing.js`:

```javascript
{
  id: 11,
  title: "Topic Title | 中文标题",
  type: "议论文",
  difficulty: "中等",
  prompt: "Writing directions...",
  tips: ["提示1", "提示2"],
  wordLimit: "150-200 words"
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
