import { vocabulary } from './data/vocabulary.js';
import { readingPassages } from './data/reading.js';
import { writingPrompts, writingRubric } from './data/writing.js';
import { 
  updateWordStatus, 
  getWordStatus, 
  addQuizResult, 
  resetProgress, 
  getStatistics,
  getReadingProgress,
  saveReadingProgress,
  getWritingProgress,
  getWritingDraft,
  saveWritingDraft
} from './utils/storage.js';

class CET6StudyApp {
  constructor() {
    this.vocabulary = vocabulary;
    this.readingPassages = readingPassages;
    this.writingPrompts = writingPrompts;
    this.writingRubric = writingRubric;
    
    this.currentCardIndex = 0;
    this.filteredVocabulary = [...vocabulary];
    this.currentFilter = 'all';
    
    this.quizQuestions = [];
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.quizTotal = 10;
    this.isQuizActive = false;
    
    this.currentPassageIndex = null;
    this.readingAnswers = {};
    this.readingSubmitted = false;
    
    this.currentPromptIndex = null;
    this.rubricState = {};
    
    this.init();
  }
  
  init() {
    this.setupNavigation();
    this.setupFlashcards();
    this.setupQuiz();
    this.setupDashboard();
    this.setupReading();
    this.setupWriting();
    this.updateHomeStats();
  }
  
  setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const page = e.target.dataset.page;
        this.navigateToPage(page);
      });
    });
    
    document.querySelector('[data-action="start-flashcards"]')?.addEventListener('click', () => {
      this.navigateToPage('flashcards');
    });
    
    document.querySelector('[data-action="start-dashboard"]')?.addEventListener('click', () => {
      this.navigateToPage('dashboard');
    });
    
    document.querySelectorAll('.feature-card[data-action]').forEach(card => {
      card.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        if (action === 'goto-flashcards') this.navigateToPage('flashcards');
        if (action === 'goto-quiz') this.navigateToPage('quiz');
        if (action === 'goto-reading') this.navigateToPage('reading');
        if (action === 'goto-writing') this.navigateToPage('writing');
        if (action === 'goto-dashboard') this.navigateToPage('dashboard');
      });
    });
    
    document.querySelectorAll('[data-action="goto-quiz"]').forEach(btn => {
      btn.addEventListener('click', () => this.navigateToPage('quiz'));
    });
    
    document.querySelectorAll('[data-action="goto-reading"]').forEach(btn => {
      btn.addEventListener('click', () => this.navigateToPage('reading'));
    });
    
    document.querySelectorAll('[data-action="goto-writing"]').forEach(btn => {
      btn.addEventListener('click', () => this.navigateToPage('writing'));
    });
    
    document.querySelector('[data-action="review-weak"]')?.addEventListener('click', () => {
      this.navigateToPage('flashcards');
      this.applyFilter('learning');
    });
  }
  
  navigateToPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    document.getElementById(`page-${pageName}`)?.classList.add('active');
    document.querySelector(`[data-page="${pageName}"]`)?.classList.add('active');
    
    if (pageName === 'dashboard') {
      this.updateDashboard();
    } else if (pageName === 'flashcards') {
      this.applyFilter(this.currentFilter);
    } else if (pageName === 'reading') {
      this.renderPassageList();
    } else if (pageName === 'writing') {
      this.renderPromptList();
    }
  }
  
  updateHomeStats() {
    const stats = getStatistics(this.vocabulary);
    document.getElementById('total-words').textContent = stats.total;
    document.getElementById('learned-words').textContent = stats.mastered;
    document.getElementById('study-streak').textContent = stats.studyStreak;
  }
  
  // ================================
  // FLASHCARDS
  // ================================
  setupFlashcards() {
    const flashcard = document.getElementById('flashcard');
    flashcard.addEventListener('click', () => {
      flashcard.classList.toggle('flipped');
    });
    
    document.getElementById('btn-prev').addEventListener('click', () => {
      this.prevCard();
    });
    
    document.getElementById('btn-next').addEventListener('click', () => {
      this.nextCard();
    });
    
    document.getElementById('btn-mark-learning').addEventListener('click', () => {
      this.markCurrentCard('learning');
    });
    
    document.getElementById('btn-mark-mastered').addEventListener('click', () => {
      this.markCurrentCard('mastered');
    });
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        this.applyFilter(filter);
      });
    });
    
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('page-flashcards').classList.contains('active')) return;
      
      if (e.key === 'ArrowLeft') this.prevCard();
      if (e.key === 'ArrowRight') this.nextCard();
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        flashcard.classList.toggle('flipped');
      }
    });
    
    this.updateCard();
  }
  
  applyFilter(filter) {
    this.currentFilter = filter;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    if (filter === 'all') {
      this.filteredVocabulary = [...this.vocabulary];
    } else {
      this.filteredVocabulary = this.vocabulary.filter(item => {
        const status = getWordStatus(item.word);
        return status === filter;
      });
    }
    
    this.currentCardIndex = 0;
    this.updateCard();
    document.getElementById('total-cards').textContent = this.filteredVocabulary.length;
  }
  
  updateCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.remove('flipped');
    
    if (this.filteredVocabulary.length === 0) {
      document.getElementById('card-word').textContent = '没有单词';
      document.getElementById('card-phonetic').textContent = '';
      document.getElementById('card-translation').textContent = '当前筛选条件下没有单词';
      document.getElementById('card-example').textContent = '';
      document.getElementById('current-card').textContent = 0;
      document.getElementById('total-cards').textContent = 0;
      return;
    }
    
    const word = this.filteredVocabulary[this.currentCardIndex];
    document.getElementById('card-word').textContent = word.word;
    document.getElementById('card-phonetic').textContent = word.phonetic;
    document.getElementById('card-translation').textContent = word.translation;
    document.getElementById('card-example').textContent = word.example;
    
    document.getElementById('current-card').textContent = this.currentCardIndex + 1;
    document.getElementById('total-cards').textContent = this.filteredVocabulary.length;
  }
  
  nextCard() {
    if (this.filteredVocabulary.length === 0) return;
    this.currentCardIndex = (this.currentCardIndex + 1) % this.filteredVocabulary.length;
    this.updateCard();
  }
  
  prevCard() {
    if (this.filteredVocabulary.length === 0) return;
    this.currentCardIndex = (this.currentCardIndex - 1 + this.filteredVocabulary.length) % this.filteredVocabulary.length;
    this.updateCard();
  }
  
  markCurrentCard(status) {
    if (this.filteredVocabulary.length === 0) return;
    const word = this.filteredVocabulary[this.currentCardIndex];
    updateWordStatus(word.word, status);
    this.updateHomeStats();
    
    const statusText = status === 'learning' ? '学习中 📖' : '已掌握 ✓';
    this.showToast(`${word.word} 已标记为${statusText}`);
    
    this.nextCard();
  }
  
  showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--bg-card);
      color: var(--text-primary);
      padding: 12px 24px;
      border-radius: 8px;
      border: 1px solid var(--border);
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 2000);
  }
  
  // ================================
  // QUIZ
  // ================================
  setupQuiz() {
    document.getElementById('btn-start-quiz').addEventListener('click', () => {
      this.startQuiz();
    });
    
    document.getElementById('btn-restart-quiz').addEventListener('click', () => {
      this.showQuizStart();
    });
  }
  
  startQuiz() {
    this.quizTotal = parseInt(document.getElementById('quiz-count').value);
    this.quizScore = 0;
    this.currentQuizIndex = 0;
    this.isQuizActive = true;
    
    this.quizQuestions = this.generateQuizQuestions(this.quizTotal);
    
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-card').style.display = 'block';
    document.querySelector('.quiz-header').style.display = 'flex';
    
    document.getElementById('quiz-total').textContent = this.quizTotal;
    
    this.showQuizQuestion();
  }
  
  generateQuizQuestions(count) {
    const shuffled = [...this.vocabulary].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }
  
  showQuizQuestion() {
    const question = this.quizQuestions[this.currentQuizIndex];
    
    document.getElementById('quiz-current').textContent = this.currentQuizIndex + 1;
    document.getElementById('quiz-score').textContent = this.quizScore;
    document.getElementById('quiz-word').textContent = question.word;
    document.getElementById('quiz-phonetic').textContent = question.phonetic;
    
    const options = this.generateOptions(question);
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'quiz-option';
      button.textContent = `${String.fromCharCode(65 + index)}. ${option.translation}`;
      button.dataset.correct = option.word === question.word;
      button.addEventListener('click', (e) => this.handleAnswer(e, question));
      optionsContainer.appendChild(button);
    });
  }
  
  generateOptions(correctWord) {
    const options = [correctWord];
    const otherWords = this.vocabulary.filter(w => w.word !== correctWord.word);
    const shuffled = otherWords.sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < 3 && i < shuffled.length; i++) {
      options.push(shuffled[i]);
    }
    
    return options.sort(() => Math.random() - 0.5);
  }
  
  handleAnswer(e, question) {
    const buttons = document.querySelectorAll('.quiz-option');
    const isCorrect = e.target.dataset.correct === 'true';
    
    buttons.forEach(btn => {
      btn.classList.add('disabled');
      if (btn.dataset.correct === 'true') {
        btn.classList.add('correct');
      } else if (btn === e.target && !isCorrect) {
        btn.classList.add('incorrect');
      }
    });
    
    if (isCorrect) {
      this.quizScore++;
      document.getElementById('quiz-score').textContent = this.quizScore;
    }
    
    setTimeout(() => {
      this.currentQuizIndex++;
      if (this.currentQuizIndex < this.quizQuestions.length) {
        this.showQuizQuestion();
      } else {
        this.endQuiz();
      }
    }, 1000);
  }
  
  endQuiz() {
    this.isQuizActive = false;
    
    addQuizResult(this.quizScore, this.quizTotal);
    this.updateHomeStats();
    
    document.getElementById('quiz-card').style.display = 'none';
    document.querySelector('.quiz-header').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    
    document.getElementById('final-score').textContent = this.quizScore;
    document.getElementById('final-total').textContent = this.quizTotal;
    
    const percentage = Math.round((this.quizScore / this.quizTotal) * 100);
    document.getElementById('result-percent').textContent = `正确率: ${percentage}%`;
    
    const resultIcon = document.querySelector('.result-icon');
    if (percentage >= 80) {
      resultIcon.textContent = '🎉';
    } else if (percentage >= 60) {
      resultIcon.textContent = '👍';
    } else {
      resultIcon.textContent = '💪';
    }
  }
  
  showQuizStart() {
    document.getElementById('quiz-start').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-card').style.display = 'none';
    document.querySelector('.quiz-header').style.display = 'none';
  }
  
  // ================================
  // DASHBOARD
  // ================================
  setupDashboard() {
    document.getElementById('btn-reset-all').addEventListener('click', () => {
      if (confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
        resetProgress();
        this.updateDashboard();
        this.updateHomeStats();
        this.showToast('所有进度已重置');
      }
    });
  }
  
  updateDashboard() {
    const stats = getStatistics(this.vocabulary);
    const readingProg = getReadingProgress();
    const writingProg = getWritingProgress();
    
    // Streak
    document.getElementById('dash-streak').textContent = stats.studyStreak;
    const streakMessages = [
      '开始你的学习之旅吧！',
      '很好的开始！继续保持！',
      '太棒了！你正在建立学习习惯！',
      '连续学习中，加油！',
      '你真的很棒！坚持就是胜利！',
      '学习达人！继续前进！',
      '太厉害了！你已经形成了学习习惯！'
    ];
    const msgIndex = Math.min(stats.studyStreak, streakMessages.length - 1);
    document.getElementById('streak-message').textContent = streakMessages[msgIndex];
    
    // Progress Ring
    const percent = Math.round((stats.mastered / stats.total) * 100) || 0;
    document.getElementById('dash-progress-percent').textContent = `${percent}%`;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percent / 100) * circumference;
    const ring = document.getElementById('dash-progress-ring');
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = offset;
    
    // Word breakdown
    document.getElementById('dash-new').textContent = stats.new;
    document.getElementById('dash-learning').textContent = stats.learning;
    document.getElementById('dash-mastered').textContent = stats.mastered;
    
    // Quiz history
    const quizHistoryEl = document.getElementById('dash-quiz-history');
    if (stats.quizHistory.length === 0) {
      quizHistoryEl.innerHTML = '<p class="empty-message">暂无测验记录</p>';
    } else {
      quizHistoryEl.innerHTML = stats.quizHistory.slice(0, 5).map(item => {
        const date = new Date(item.date).toLocaleString('zh-CN', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        return `
          <div class="quiz-history-item">
            <span>${date}</span>
            <span class="score">${item.score}/${item.total} (${item.percentage}%)</span>
          </div>
        `;
      }).join('');
    }
    
    // Weak words
    const weakWordsEl = document.getElementById('dash-weak-words');
    const weakWords = this.vocabulary.filter(w => getWordStatus(w.word) === 'learning');
    if (weakWords.length === 0) {
      weakWordsEl.innerHTML = '<p class="empty-message">太棒了！没有需要复习的单词</p>';
    } else {
      weakWordsEl.innerHTML = weakWords.slice(0, 5).map(w => `
        <div class="weak-word-item">
          <span class="word">${w.word}</span>
          <span class="translation">${w.translation}</span>
        </div>
      `).join('');
    }
    
    // Reading progress
    const readingProgressEl = document.getElementById('dash-reading-progress');
    const completedReadings = Object.keys(readingProg).filter(id => readingProg[id].completed);
    if (completedReadings.length === 0) {
      readingProgressEl.innerHTML = '<p class="empty-message">暂无阅读记录</p>';
    } else {
      readingProgressEl.innerHTML = this.readingPassages
        .filter(p => readingProg[p.id]?.completed)
        .slice(0, 3)
        .map(p => `
          <div class="progress-item">
            <span class="title">${p.title}</span>
            <span class="status completed">已完成 ${readingProg[p.id].score}/${readingProg[p.id].total}</span>
          </div>
        `).join('');
    }
    
    // Writing progress
    const writingProgressEl = document.getElementById('dash-writing-progress');
    const writingWithDrafts = this.writingPrompts.filter(p => {
      const draft = getWritingDraft(p.id);
      return draft && draft.content && draft.content.trim().length > 0;
    });
    if (writingWithDrafts.length === 0) {
      writingProgressEl.innerHTML = '<p class="empty-message">暂无写作记录</p>';
    } else {
      writingProgressEl.innerHTML = writingWithDrafts.slice(0, 3).map(p => {
        const draft = getWritingDraft(p.id);
        const wordCount = this.countWords(draft.content);
        return `
          <div class="progress-item">
            <span class="title">${p.title.split('|')[0].trim()}</span>
            <span class="status in-progress">${wordCount}词</span>
          </div>
        `;
      }).join('');
    }
  }
  
  // ================================
  // READING COMPREHENSION
  // ================================
  setupReading() {
    document.getElementById('btn-back-to-passages').addEventListener('click', () => {
      this.showPassageList();
    });
    
    document.getElementById('btn-show-explanations').addEventListener('click', () => {
      this.showExplanations();
    });
    
    document.getElementById('btn-next-passage').addEventListener('click', () => {
      this.goToNextPassage();
    });
  }
  
  renderPassageList() {
    const readingProg = getReadingProgress();
    const listEl = document.getElementById('passage-list');
    
    listEl.innerHTML = this.readingPassages.map(passage => {
      const prog = readingProg[passage.id];
      const status = prog?.completed ? 'completed' : 'not-started';
      const scoreText = prog?.completed ? ` (${prog.score}/${prog.total})` : '';
      
      return `
        <div class="passage-card" data-passage-id="${passage.id}">
          <div class="passage-card-info">
            <h3>${passage.title}</h3>
            <div class="passage-card-meta">
              <span>难度: ${passage.difficulty}</span>
              <span>词数: ${passage.wordCount}</span>
              ${scoreText ? `<span>得分: ${scoreText}</span>` : ''}
            </div>
          </div>
          <div class="passage-card-status ${status}"></div>
        </div>
      `;
    }).join('');
    
    listEl.querySelectorAll('.passage-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.passageId);
        this.showPassage(id);
      });
    });
    
    document.getElementById('passage-list').style.display = 'grid';
    document.getElementById('reading-view').style.display = 'none';
  }
  
  showPassageList() {
    document.getElementById('passage-list').style.display = 'grid';
    document.getElementById('reading-view').style.display = 'none';
    this.renderPassageList();
  }
  
  showPassage(id) {
    const passage = this.readingPassages.find(p => p.id === id);
    if (!passage) return;
    
    this.currentPassageIndex = this.readingPassages.indexOf(passage);
    this.readingAnswers = {};
    this.readingSubmitted = false;
    
    document.getElementById('passage-list').style.display = 'none';
    document.getElementById('reading-view').style.display = 'block';
    document.getElementById('reading-result').style.display = 'none';
    
    document.getElementById('reading-difficulty').textContent = `难度: ${passage.difficulty}`;
    document.getElementById('reading-wordcount').textContent = `词数: ${passage.wordCount}`;
    document.getElementById('passage-title').textContent = passage.title;
    document.getElementById('passage-text').innerHTML = passage.passage.split('\n\n').map(p => `<p>${p}</p>`).join('');
    
    this.renderReadingQuestions(passage);
  }
  
  renderReadingQuestions(passage) {
    const questionsEl = document.getElementById('reading-questions');
    
    questionsEl.innerHTML = passage.questions.map((q, qIndex) => `
      <div class="reading-question" data-question-id="${q.id}">
        <div class="question-number">Question ${qIndex + 1}</div>
        <div class="question-text">${q.question}</div>
        <div class="question-options">
          ${q.options.map((opt, optIndex) => `
            <div class="question-option" data-option-index="${optIndex}">
              ${opt}
            </div>
          `).join('')}
        </div>
        <div class="question-explanation">${q.explanation}</div>
      </div>
    `).join('');
    
    questionsEl.querySelectorAll('.question-option').forEach(optEl => {
      optEl.addEventListener('click', (e) => {
        if (this.readingSubmitted) return;
        this.handleReadingAnswer(e, passage);
      });
    });
  }
  
  handleReadingAnswer(e, passage) {
    const questionEl = e.target.closest('.reading-question');
    const questionId = parseInt(questionEl.dataset.questionId);
    const optionIndex = parseInt(e.target.dataset.optionIndex);
    
    questionEl.querySelectorAll('.question-option').forEach(opt => {
      opt.classList.remove('selected');
    });
    e.target.classList.add('selected');
    
    this.readingAnswers[questionId] = optionIndex;
    
    if (Object.keys(this.readingAnswers).length === passage.questions.length) {
      this.submitReadingAnswers(passage);
    }
  }
  
  submitReadingAnswers(passage) {
    this.readingSubmitted = true;
    let score = 0;
    
    passage.questions.forEach(q => {
      const userAnswer = this.readingAnswers[q.id];
      const questionEl = document.querySelector(`[data-question-id="${q.id}"]`);
      const options = questionEl.querySelectorAll('.question-option');
      
      options.forEach((opt, idx) => {
        opt.classList.add('disabled');
        if (idx === q.correctAnswer) {
          opt.classList.add('correct');
        } else if (idx === userAnswer && userAnswer !== q.correctAnswer) {
          opt.classList.add('incorrect');
        }
      });
      
      if (userAnswer === q.correctAnswer) {
        score++;
      }
    });
    
    saveReadingProgress(passage.id, {
      completed: true,
      score: score,
      total: passage.questions.length,
      date: new Date().toISOString()
    });
    
    document.getElementById('reading-result').style.display = 'block';
    document.getElementById('reading-score').textContent = score;
    document.getElementById('reading-total').textContent = passage.questions.length;
  }
  
  showExplanations() {
    document.querySelectorAll('.question-explanation').forEach(el => {
      el.classList.add('visible');
    });
    document.getElementById('btn-show-explanations').style.display = 'none';
  }
  
  goToNextPassage() {
    const nextIndex = (this.currentPassageIndex + 1) % this.readingPassages.length;
    this.showPassage(this.readingPassages[nextIndex].id);
  }
  
  // ================================
  // WRITING PRACTICE
  // ================================
  setupWriting() {
    document.getElementById('btn-back-to-prompts').addEventListener('click', () => {
      this.showPromptList();
    });
    
    document.getElementById('btn-save-draft').addEventListener('click', () => {
      this.saveDraft();
    });
    
    document.getElementById('btn-clear-draft').addEventListener('click', () => {
      if (confirm('确定要清空当前草稿吗？')) {
        document.getElementById('draft-textarea').value = '';
        this.updateWordCount();
        this.saveDraft();
      }
    });
    
    document.getElementById('draft-textarea').addEventListener('input', () => {
      this.updateWordCount();
    });
  }
  
  renderPromptList() {
    const listEl = document.getElementById('prompt-list');
    
    listEl.innerHTML = this.writingPrompts.map(prompt => {
      const draft = getWritingDraft(prompt.id);
      const hasDraft = draft && draft.content && draft.content.trim().length > 0;
      const wordCount = hasDraft ? this.countWords(draft.content) : 0;
      
      return `
        <div class="prompt-card" data-prompt-id="${prompt.id}">
          <div class="prompt-card-header">
            <h3>${prompt.title}</h3>
            ${hasDraft ? `<span class="prompt-card-badge">${wordCount}词草稿</span>` : ''}
          </div>
          <div class="prompt-card-meta">
            <span>类型: ${prompt.type}</span>
            <span>难度: ${prompt.difficulty}</span>
            <span>字数: ${prompt.wordLimit}</span>
          </div>
        </div>
      `;
    }).join('');
    
    listEl.querySelectorAll('.prompt-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.promptId);
        this.showPrompt(id);
      });
    });
    
    document.getElementById('prompt-list').style.display = 'grid';
    document.getElementById('writing-view').style.display = 'none';
  }
  
  showPromptList() {
    this.saveDraft();
    document.getElementById('prompt-list').style.display = 'grid';
    document.getElementById('writing-view').style.display = 'none';
    this.renderPromptList();
  }
  
  showPrompt(id) {
    const prompt = this.writingPrompts.find(p => p.id === id);
    if (!prompt) return;
    
    this.currentPromptIndex = this.writingPrompts.indexOf(prompt);
    
    document.getElementById('prompt-list').style.display = 'none';
    document.getElementById('writing-view').style.display = 'block';
    
    document.getElementById('writing-type').textContent = `类型: ${prompt.type}`;
    document.getElementById('writing-difficulty').textContent = `难度: ${prompt.difficulty}`;
    document.getElementById('prompt-title').textContent = prompt.title;
    document.getElementById('prompt-text').textContent = prompt.prompt;
    
    const tipsListEl = document.getElementById('prompt-tips-list');
    tipsListEl.innerHTML = prompt.tips.map(tip => `<li>${tip}</li>`).join('');
    
    const draft = getWritingDraft(prompt.id);
    document.getElementById('draft-textarea').value = draft?.content || '';
    this.updateWordCount();
    
    this.renderRubric(prompt.id);
  }
  
  renderRubric(promptId) {
    const checklistEl = document.getElementById('rubric-checklist');
    const savedRubric = getWritingDraft(promptId)?.rubric || {};
    this.rubricState = { ...savedRubric };
    
    checklistEl.innerHTML = this.writingRubric.map(category => `
      <div class="rubric-category">
        <div class="rubric-category-title">${category.category}</div>
        <div class="rubric-items">
          ${category.items.map(item => `
            <div class="rubric-item">
              <input type="checkbox" id="${item.id}" ${savedRubric[item.id] ? 'checked' : ''}>
              <label for="${item.id}">${item.text}</label>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
    
    const totalItems = this.writingRubric.reduce((sum, cat) => sum + cat.items.length, 0);
    document.getElementById('rubric-total').textContent = totalItems;
    
    checklistEl.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.rubricState[checkbox.id] = checkbox.checked;
        this.updateRubricScore();
        this.saveDraft();
      });
    });
    
    this.updateRubricScore();
  }
  
  updateRubricScore() {
    const checkedCount = Object.values(this.rubricState).filter(v => v).length;
    const totalItems = this.writingRubric.reduce((sum, cat) => sum + cat.items.length, 0);
    const percent = Math.round((checkedCount / totalItems) * 100);
    
    document.getElementById('rubric-score').textContent = checkedCount;
    document.getElementById('rubric-percent').textContent = `(${percent}%)`;
  }
  
  countWords(text) {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  }
  
  updateWordCount() {
    const textarea = document.getElementById('draft-textarea');
    const count = this.countWords(textarea.value);
    const countEl = document.getElementById('draft-word-count');
    const containerEl = document.querySelector('.word-count');
    
    countEl.textContent = count;
    
    containerEl.classList.remove('warning', 'good');
    if (count >= 150 && count <= 200) {
      containerEl.classList.add('good');
    } else if (count > 200 || (count > 0 && count < 150)) {
      containerEl.classList.add('warning');
    }
  }
  
  saveDraft() {
    if (this.currentPromptIndex === null) return;
    
    const prompt = this.writingPrompts[this.currentPromptIndex];
    const content = document.getElementById('draft-textarea').value;
    
    saveWritingDraft(prompt.id, {
      content: content,
      rubric: this.rubricState,
      lastSaved: new Date().toISOString()
    });
    
    this.showToast('草稿已保存');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CET6StudyApp();
});
