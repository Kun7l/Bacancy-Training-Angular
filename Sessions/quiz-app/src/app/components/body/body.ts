import { Component } from '@angular/core';
import { Quiz } from "../quiz/quiz";

@Component({
  selector: 'app-body',
  imports: [Quiz],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {

}
