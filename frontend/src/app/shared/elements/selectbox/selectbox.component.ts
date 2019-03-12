import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'd20md-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: [ './selectbox.component.scss' ]
})

export class SelectboxComponent implements OnChanges {
  @Input() id: string;
  @Input() name: string;
  @Input() value: any;
  @Output() valueChange = new EventEmitter();
  @Input() inputDivClass = 'col-sm-6';
  @Input() placeholder: string;
  @Input() values: Observable<{[index: string]: any; }>;

  public valuesDisplay: {[index: string]: any; } = {};

  ngOnChanges(changes: any) {
    if (!changes['values'] || !changes['values'].currentValue) { return; }

    this.values = changes['values'].currentValue;
    this.values.subscribe((values) => this.valuesDisplay = values);
  }
}
