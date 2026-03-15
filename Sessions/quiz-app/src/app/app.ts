import { Component } from '@angular/core';
import { Header } from "./components/header/header";
import { Body } from './components/body/body';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header,Body,Footer ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'quiz-app';
}
