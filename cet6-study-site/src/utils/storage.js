const STORAGE_KEY = 'cet6_study_progress';
const READING_KEY = 'cet6_reading_progress';
const WRITING_KEY = 'cet6_writing_drafts';

// ================================
// MAIN PROGRESS
// ================================
export function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getDefaultProgress();
  } catch (e) {
    console.error('Error reading progress:', e);
    return getDefaultProgress();
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
}

export function getDefaultProgress() {
  return {
    wordStatus: {},
    quizHistory: [],
    studyStreak: 0,
    lastStudyDate: null,
    totalQuizzesTaken: 0,
    totalCorrectAnswers: 0,
    createdAt: new Date().toISOString()
  };
}

export function updateWordStatus(word, status) {
  const progress = getProgress();
  progress.wordStatus[word] = status;
  updateStudyStreak(progress);
  saveProgress(progress);
  return progress;
}

export function getWordStatus(word) {
  const progress = getProgress();
  return progress.wordStatus[word] || 'new';
}

export function updateStudyStreak(progress) {
  const today = new Date().toDateString();
  const lastStudy = progress.lastStudyDate;
  
  if (!lastStudy) {
    progress.studyStreak = 1;
  } else {
    const lastDate = new Date(lastStudy);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Same day, no change
    } else if (diffDays === 1) {
      progress.studyStreak += 1;
    } else {
      progress.studyStreak = 1;
    }
  }
  
  progress.lastStudyDate = today;
}

export function addQuizResult(score, total) {
  const progress = getProgress();
  const result = {
    date: new Date().toISOString(),
    score,
    total,
    percentage: Math.round((score / total) * 100)
  };
  
  progress.quizHistory.unshift(result);
  if (progress.quizHistory.length > 50) {
    progress.quizHistory = progress.quizHistory.slice(0, 50);
  }
  
  progress.totalQuizzesTaken += 1;
  progress.totalCorrectAnswers += score;
  
  updateStudyStreak(progress);
  saveProgress(progress);
  
  return progress;
}

export function resetProgress() {
  const defaultProgress = getDefaultProgress();
  saveProgress(defaultProgress);
  
  localStorage.removeItem(READING_KEY);
  localStorage.removeItem(WRITING_KEY);
  
  return defaultProgress;
}

export function getStatistics(vocabulary) {
  const progress = getProgress();
  const stats = {
    total: vocabulary.length,
    new: 0,
    learning: 0,
    mastered: 0,
    studyStreak: progress.studyStreak,
    quizHistory: progress.quizHistory
  };
  
  vocabulary.forEach(item => {
    const status = progress.wordStatus[item.word] || 'new';
    stats[status]++;
  });
  
  return stats;
}

// ================================
// READING PROGRESS
// ================================
export function getReadingProgress() {
  try {
    const data = localStorage.getItem(READING_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Error reading reading progress:', e);
    return {};
  }
}

export function saveReadingProgress(passageId, progressData) {
  try {
    const allProgress = getReadingProgress();
    allProgress[passageId] = progressData;
    localStorage.setItem(READING_KEY, JSON.stringify(allProgress));
    
    const mainProgress = getProgress();
    updateStudyStreak(mainProgress);
    saveProgress(mainProgress);
  } catch (e) {
    console.error('Error saving reading progress:', e);
  }
}

// ================================
// WRITING DRAFTS
// ================================
export function getWritingProgress() {
  try {
    const data = localStorage.getItem(WRITING_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Error reading writing progress:', e);
    return {};
  }
}

export function getWritingDraft(promptId) {
  const progress = getWritingProgress();
  return progress[promptId] || null;
}

export function saveWritingDraft(promptId, draftData) {
  try {
    const allProgress = getWritingProgress();
    allProgress[promptId] = draftData;
    localStorage.setItem(WRITING_KEY, JSON.stringify(allProgress));
    
    const mainProgress = getProgress();
    updateStudyStreak(mainProgress);
    saveProgress(mainProgress);
  } catch (e) {
    console.error('Error saving writing draft:', e);
  }
}
