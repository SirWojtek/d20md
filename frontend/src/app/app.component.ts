import {Component} from '@angular/core';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {environment} from '../environments/environment';

@Component({
  selector: 'd20md-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  disableAnimations = environment.disableAnimations;

  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}

  onActivate() {
    window.scroll(0, 0);
  }
}
