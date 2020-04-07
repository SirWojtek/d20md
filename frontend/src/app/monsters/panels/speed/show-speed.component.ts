import { Component, Input, OnChanges } from '@angular/core';
import { Speed } from '../../../shared/model/speed';
import { chromaColor } from '../../../shared/chroma-color';

@Component({
  selector: 'd20md-show-speed',
  templateUrl: './show-speed.component.html',
  styleUrls: ['./show-speed.component.scss']
})
export class ShowSpeedComponent implements OnChanges {
  @Input() speed: Speed;
  @Input() viewOnly = false;

  speedColors = chromaColor([0, 30, 100, 200, 500]);

  ngOnChanges(changes: any) {
    if (!changes['speed'] || !changes['speed'].currentValue) {
      return;
    }

    this.speed = changes['speed'].currentValue;
  }

  getSquareText(feetDist: number): string {
    const squares = Math.floor(feetDist / 5);
    return squares === 1 ? squares + ' square' : squares + ' squares';
  }
}
