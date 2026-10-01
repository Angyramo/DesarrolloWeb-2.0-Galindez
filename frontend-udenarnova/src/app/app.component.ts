/*import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-udenarnova';
}
*/

import { Component } from '@angular/core';
import { ServidoresComponent } from './components/servidores/servidores.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ServidoresComponent],
  template: '<app-servidores></app-servidores>'
})
export class AppComponent {
  title = 'frontend-udenarnova';
}