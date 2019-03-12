import { Component, Input } from '@angular/core';

@Component({
  selector: 'd20md-show-saves',
  templateUrl: './show-saves.component.html',
  styleUrls: [ './show-saves.component.scss' ]
})

export class ShowSavesComponent {
  @Input() save: string;
  @Input() spellResistable: boolean;
}
