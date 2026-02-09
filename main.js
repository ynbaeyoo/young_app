document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generateLottoNumbers');
  const displayArea = document.getElementById('lottoNumbersDisplay');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Theme toggle logic
  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      themeToggle.textContent = 'Toggle Light Mode';
    } else {
      body.classList.remove('dark-mode');
      themeToggle.textContent = 'Toggle Dark Mode';
    }
  }

  // Check for saved theme preference or system preference on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // If no saved theme, check system preference
    applyTheme('dark');
  } else {
    applyTheme('light'); // Default to light mode
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
      } else {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // Lotto generator logic (existing)
  if (generateButton && displayArea) {
    generateButton.addEventListener('click', () => {
      const lottoNumbers = generateUniqueRandomNumbers(6, 1, 45);
      displayLottoNumbers(lottoNumbers, displayArea);
    });
  }

  function generateUniqueRandomNumbers(count, min, max) {
    const numbers = new Set();
    while (numbers.size < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }

  function displayLottoNumbers(numbers, displayElement) {
    displayElement.innerHTML = ''; // Clear previous numbers
    if (numbers.length === 0) {
      displayElement.textContent = 'Please generate numbers.'; // Changed text to English
      return;
    }
    numbers.forEach(number => {
      const span = document.createElement('span');
      span.textContent = number;
      displayElement.appendChild(span);
    });
  }
});