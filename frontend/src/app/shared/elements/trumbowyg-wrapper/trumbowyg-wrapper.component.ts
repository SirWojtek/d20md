import { Component, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'd20md-trumbowyg-wrapper',
  template: `
  <trumbowyg #trumbowyg liveUpdate="true"
    [options]="trumbowygOptions"
    (savedContent)="onChange.emit($event)"
  ></trumbowyg>
  `,
  styles: [
    ':host ::ng-deep .trumbowyg-editor { text-align: left; }',
    `:host ::ng-deep .trumbowyg-button-pane {
      background-color: #375a7f;
      color: white;
    }`,
    `:host ::ng-deep .trumbowyg-button-pane::after {
      background: #375a7f;
    }`,
    `:host ::ng-deep .trumbowyg-editor {
      background-color: hsl(0, 0%, 22%);
    }`,
    `:host ::ng-deep .trumbowyg-box {
      border-radius: 4px;
      border: 1px solid #375a7f;
    }`,
    `:host ::ng-deep .trumbowyg-button-group svg {
      fill: #fff;
    }`,
  ]
})

export class TrumbowygWrapperComponent {
  @Output() onChange = new EventEmitter<string>();

  @ViewChild('trumbowyg') trumbowygComponent;

  trumbowygOptions: any = {
    autogrow: true,
    removeformatPasted: true,
    semantic: false,
    btns: [
      ['viewHTML'],
      ['formatting'],
      ['strong', 'em', 'del'],
      ['unorderedList', 'orderedList'],
      ['horizontalRule'],
      ['removeformat'],
      ['table']
    ],
  };

  public init(data: string) {
    // NOTE: hack for showing new content
    this.trumbowygComponent.content$.next(data);
  }
}
