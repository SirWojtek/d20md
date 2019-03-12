import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  template: ''
})

export class AddRemoveEditorComponent<LocalFinder, RemoteFinder> {
  @Input() item: any[] = [];
  @Output() itemChange = new EventEmitter();

  private localFinder: LocalFinder;
  private remoteFinder: RemoteFinder;

  protected init(localFinder: any, remoteFinder: any) {
    this.localFinder = localFinder;
    this.remoteFinder = remoteFinder;
    this.configureFinder(this.localFinder, (item) => this.onRemoveItem(item));
    this.configureFinder(this.remoteFinder, (item) => this.onAddItem(item));
  }

  private configureFinder(finderComponent: any, onClickCallback: (any) => void) {
    finderComponent.finderConfiguratorService.showDetails = false;
    finderComponent.finderConfiguratorService.onItemClickCallback
    .subscribe((item: any) => {
      onClickCallback(item);
    });
  }

  private onRemoveItem(toRemove: any) {
    const toRemoveIndex = this.item.findIndex((item: any) => {
      return item.id === toRemove.id;
    });
    this.item.splice(toRemoveIndex, 1);
    this.itemChange.emit(this.item);
  }

  private onAddItem(toAdd: any) {
    if (this.isItemPresent(this.item, toAdd)) {
      return;
    }

    this.item.unshift(toAdd);
    this.itemChange.emit(this.item);
  }

  private isItemPresent(items: any[], item: any) {
    return items.find((s: any) => ( s.id === item.id )) !== undefined;
  }
}
