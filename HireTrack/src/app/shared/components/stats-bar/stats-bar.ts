import { Component, input } from '@angular/core';
import { StatusColorDirective } from "../../directives/status-color-directive";

@Component({
  selector: 'app-stats-bar',
  imports: [],
  templateUrl: './stats-bar.html',
  styleUrl: './stats-bar.css',
})
export class StatsBar {
  statsBarData = input({
    wishlist: 0,
    applied: 0,
    interview: 0,
    offer: 0,
  });
}
