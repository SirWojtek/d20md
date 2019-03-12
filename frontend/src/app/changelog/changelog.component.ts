import { Component } from '@angular/core';
import { changelog } from './changelog';

@Component({
  template: `
  <div *ngFor="let change of changelog" class="well well-lg">
    <div class="header text-success">
      <h4>{{ change.title }}</h4>
      <span>{{ change.date | date:'longDate' }}</span>
    </div>
    <div class="content">
      {{ change.content }}
    </div>
  </div>
  `,
  styles: [
    `.header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }`,
  ]
})

export class ChangelogComponent {
  changelog = changelog;
}
