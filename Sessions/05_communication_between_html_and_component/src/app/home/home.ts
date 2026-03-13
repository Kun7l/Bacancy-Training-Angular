import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public task1Text = 'This text comes from home.ts';

  public person = signal({
    id: 1,
    firstName: 'Krunal',
    lastName: 'Khairanar',
    maidenName: 'Pravinbhai',
    age: 21,
    gender: 'male',
    email: 'krunalkhairanar007@gmail.com',
    phone: '+63 791 675 8914',
    username: 'atuny0',
    password: '9uQFF1Lh',
    birthDate: '2000-12-25',
    image: 'https://robohash.org/Terry.png?set=set4',
    bloodGroup: 'A-',
    height: 189,
    weight: 75.4,
    eyeColor: 'Green',
    domain: 'slashdot.org',
    ip: '117.29.86.254',
    macAddress: '13:69:BA:56:A3:74',
    university: 'Capitol University',
    ein: '20-9487066',
    ssn: '661-64-2976',
    userAgent: 'Mozilla/5.0 ...',
  });

  isHidden = signal(false);

  toggleHideShow() {
    this.isHidden.set(!this.isHidden());
  }

}
