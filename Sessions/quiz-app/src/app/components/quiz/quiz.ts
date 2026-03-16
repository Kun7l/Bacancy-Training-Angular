import { CommonModule, NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, NgClass],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz {
  isSubmitted = signal(false);
  isStarted = signal(false);

  score = signal(0);
  queNumber = signal(0);
  stars = signal(0);
  

  quiestions = signal([
    {
      id: 1,
      question: 'What is the capital of India?',
      options: [
        { id: 1, option: 'Delhi' },
        { id: 2, option: 'Mumbai' },
        { id: 3, option: 'Kolkata' },
        { id: 4, option: 'Chennai' },
      ],
      answer: 1,
    },
    {
      id: 2,
      question: 'What is the capital of USA?',
      options: [
        { id: 1, option: 'New York' },
        { id: 2, option: 'Washington D.C.' },
        { id: 3, option: 'Los Angeles' },
        { id: 4, option: 'Chicago' },
      ],
      answer: 2,
    },
    {
      id: 3,
      question: 'What is the capital of UK?',
      options: [
        { id: 1, option: 'London' },
        { id: 2, option: 'Manchester' },
        { id: 3, option: 'Birmingham' },
        { id: 4, option: 'Liverpool' },
      ],
      answer: 1,
    },
    {
      id: 4,
      question: 'What is the capital of France?',
      options: [
        { id: 1, option: 'Paris' },
        { id: 2, option: 'Lyon' },
        { id: 3, option: 'Marseille' },
        { id: 4, option: 'Nice' },
      ],
      answer: 1,
    },
    {
      id: 5,
      question: 'What is the capital of Germany?',
      options: [
        { id: 1, option: 'Berlin' },
        { id: 2, option: 'Munich' },
        { id: 3, option: 'Frankfurt' },
        { id: 4, option: 'Hamburg' },
      ],
      answer: 1,
    },
  ]);

  nextQuestion() {
    if (this.queNumber() < this.quiestions().length - 1) {
      this.queNumber.update((n) => n + 1);
    }
  }
  prevQuestion() {
    if (this.queNumber() > 0) {
      this.queNumber.update((n) => n - 1);
    }
  }

  calculateScore() {
    const form = document.getElementById('quiz-form') as HTMLFormElement;
    const data = new FormData(form);

    this.score.set(0);

    this.quiestions().forEach((que) => {
      const selectedAnswer = data.get(`q${que.id}`);
      if (Number(selectedAnswer) === que.answer) {
        this.score.update((s) => s + 1);
      }
    });

    this.isSubmitted.set(true);
    console.log('Final Score:', this.score());
    this.stars.set(Math.round((this.score() * 5) / this.quiestions().length));
  }

  getStarArray() {
    return Array.from({ length: 5 }, (_, i) =>
      i < this.stars() ? 'filled' : 'empty',
    );
  }

  resetQuiz() {
    const form = document.getElementById('quiz-form') as HTMLFormElement;
    this.score.set(0);
    this.stars.set(0);
    this.isSubmitted.set(false);
    this.queNumber.set(0);
    form.reset();
  }

  starColor = computed(() => {
    const val = this.stars();
    if (val < 2) return 'red';
    if (val >= 2 && val <=4) return 'blue';
    return 'green';
  });
}
