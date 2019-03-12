import { Component, Input } from '@angular/core';
import { Save } from '../../../shared/model/save';
import { Utils } from '../../../shared/utils';
import { chromaColor } from '../../../shared/chroma-color';

@Component({
  selector: 'd20md-show-save',
  templateUrl: './show-save.component.html',
  styleUrls: [ './show-save.component.scss' ]
})

export class ShowSaveComponent {
  @Input() save: Save;

  public saveTypes = [ 'will', 'reflex', 'fortitude' ];
  utils = Utils;

  private chromaColor = chromaColor([-5, 0, 5, 10, 20]);

  public getColor(saveType: string): string {
    return this.chromaColor(this.save.total[saveType]);
  }
}
