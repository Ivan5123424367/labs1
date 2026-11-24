'use strict';

const subscriptionButton = document.getElementById('subscription');
const subscriptionStatus = document.getElementById('subscription-status');
const dailyPuzzle = document.getElementById('daily-puzzle');
const subscriptionKey = 'world-trivia.daily-puzzle';
const puzzles = [
  ['Which ocean is the largest?', 'The Pacific Ocean.'],
  ['How many faces does a cube have?', 'Six.'],
  ['Which planet is closest to the Sun?', 'Mercury.'],
  ['Which country is home to the city of Kyoto?', 'Japan.'],
  ['How many sides does a heptagon have?', 'Seven.'],
  ['Which is the largest planet in our solar system?', 'Jupiter.'],
  ['Which letter is the Roman numeral for fifty?', 'L.']
];

let subscribed = false;
try {
  subscribed = localStorage.getItem(subscriptionKey) === 'yes';
} catch {
  // Some browsers restrict storage when the page is opened from a local file.
}

function renderSubscription() {
  subscriptionButton.textContent = subscribed ? 'Unsubscribe' : 'Subscribe to Puzzle of the Day';
  dailyPuzzle.hidden = !subscribed;
  if (subscribed) {
    const today = new Date();
    const dayNumber = Math.floor(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86400000);
    const [question, answer] = puzzles[dayNumber % puzzles.length];
    document.getElementById('daily-question').textContent = question;
    document.getElementById('daily-answer').textContent = answer;
  }
}

subscriptionButton.addEventListener('click', () => {
  subscribed = !subscribed;
  let scope = 'on this device';
  try {
    if (subscribed) {
      localStorage.setItem(subscriptionKey, 'yes');
    } else {
      localStorage.removeItem(subscriptionKey);
    }
  } catch {
    scope = 'for this visit';
  }
  subscriptionStatus.textContent = subscribed ? 'Subscription active ' + scope + '.' : 'Subscription ended.';
  dailyPuzzle.querySelector('details').open = false;
  renderSubscription();
});

renderSubscription();

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

contactForm.addEventListener('input', (event) => {
  event.target.setCustomValidity('');
  contactStatus.textContent = '';
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  for (const field of [contactForm.elements.name, contactForm.elements.message]) {
    if (!field.value.trim()) {
      field.setCustomValidity('Please enter some text.');
      field.reportValidity();
      return;
    }
  }
  contactStatus.textContent = 'Thank you, ' + contactForm.elements.name.value.trim() +
    '. Your practice submission is complete.';
  contactForm.reset();
});
