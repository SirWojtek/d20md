import { Component, Input } from '@angular/core';

@Component({
  selector : 'd20md-tooltip-button',
  template : `
  <button type="button" class="btn btn-default btn-secondary btn-xs"
          tooltip="{{ tooltipText }}"
          placement="{{ placement }}">
    <d20md-icon [iconName]="iconName" [text]="innerText"></d20md-icon>
  </button>
  `,
  styles: [
    ':host .btn { vertical-align: baseline }'
  ]
})

export class TooltipButtonComponent {
  @Input() tooltipText = '';
  @Input() placement = 'top';
  @Input() iconName = 'fa-info';
  @Input() innerText = '';
}
