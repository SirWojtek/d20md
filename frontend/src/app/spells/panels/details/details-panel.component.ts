import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'd20md-details-panel',
  templateUrl: './details-panel.component.html',
})
export class DetailsPanelComponent {
  @Input()
  spellType: string;
  @Output()
  spellTypeChange = new EventEmitter<string>();

  @Input()
  spellRange: string;
  @Output()
  spellRangeChange = new EventEmitter<string>();

  @Input()
  canModify: boolean;
}
