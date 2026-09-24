import { vocabulary } from './data/vocabulary.js';
import { 
  getProgress, 
  updateWordStatus, 
  getWordStatus, 
  addQuizResult, 
  resetProgress, 
  getStatistics 
} from './utils/storage.js';

class CET6StudyApp {
  constructor() {
    this.vocabulary = vocabulary;
    this.currentCardIndex = 0;
    this.filteredVocabulary = [...vocabulary];
    this.currentFilter = 'all';
    
    this.quizQuestions = [];
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.quizTotal = 10;
    this.isQuizActive = false;
    
    this.init();
  }
  
  init() {
    this.setupNavigation();
    this.setupFlashcards();
    this.setupQuiz();
    this.setupProgress();
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
    
    document.querySelector('[data-action="start-quiz"]')?.addEventListener('click', () => {
      this.navigateToPage('quiz');
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
    
    if (pageName === 'progress') {
      this.updateProgressPage();
    } else if (pageName === 'flashcards') {
      this.applyFilter(this.currentFilter);
    }
  }
  
  updateHomeStats() {
    const stats = getStatistics(this.vocabulary);
    document.getElementById('total-words').textContent = stats.total;
    document.getElementById('learned-words').textContent = stats.mastered;
    document.getElementById('study-streak').textContent = stats.studyStreak;
  }
  
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
  
  setupProgress() {
    document.getElementById('btn-reset-progress').addEventListener('click', () => {
      if (confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
        resetProgress();
        this.updateProgressPage();
        this.updateHomeStats();
        this.showToast('进度已重置');
      }
    });
  }
  
  updateProgressPage() {
    const stats = getStatistics(this.vocabulary);
    
    const percent = Math.round((stats.mastered / stats.total) * 100) || 0;
    document.getElementById('progress-percent').textContent = `${percent}%`;
    
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percent / 100) * circumference;
    const ring = document.getElementById('progress-ring');
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = offset;
    
    document.getElementById('stat-new').textContent = stats.new;
    document.getElementById('stat-learning').textContent = stats.learning;
    document.getElementById('stat-mastered').textContent = stats.mastered;
    
    const historyList = document.getElementById('history-list');
    if (stats.quizHistory.length === 0) {
      historyList.innerHTML = '<p class="empty-message">暂无学习记录</p>';
    } else {
      historyList.innerHTML = stats.quizHistory.slice(0, 10).map(item => {
        const date = new Date(item.date).toLocaleString('zh-CN', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        return `
          <div class="history-item">
            <span>${date}</span>
            <span>得分: ${item.score}/${item.total} (${item.percentage}%)</span>
          </div>
        `;
      }).join('');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CET6StudyApp();
});
