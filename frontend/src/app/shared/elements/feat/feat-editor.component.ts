import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {Feat} from '../../../shared/model/feat';
import {FindFeatService} from '../../../feats/find/find-feat.service';
import {EnumService} from '../../../shared/enum.service';
import {Utils} from '../../../shared/utils';

@Component({
  selector: 'd20md-feat-editor',
  templateUrl: './feat-editor.component.html',
  styleUrls: ['./feat-editor.component.scss'],
})
export class FeatEditorComponent {
  private debouncePeriod = 300;

  @Input()
  feats: Feat[] = [];
  @Output()
  featsChange = new EventEmitter<Feat[]>();
  @Input()
  currentFeatId?: number;

  foundFeats: Feat[] = [];

  featTypes: Observable<{[index: string]: string}>;

  searchFields = {
    name: '',
    feat_type: '',
  };

  onSearch = _.debounce(() => this.search(), this.debouncePeriod);

  constructor(
    private findFeatService: FindFeatService,
    enumService: EnumService,
  ) {
    this.featTypes = enumService
      .getFeatTypes()
      .map(Utils.createUpperCaseToNoUpperCaseMap)
      .map(types => {
        types['Any'] = '';
        return types;
      });
    this.search();
  }

  onDelete(feat: Feat) {
    const index = this.feats.indexOf(feat);
    if (index === -1) {
      throw new Error('Cannot find feat to remove');
    }
    this.feats.splice(index, 1);
    this.featsChange.emit(this.feats);
  }

  isFeatAdded(feat: Feat): boolean {
    return (
      !!this.feats.find(f => f.id === feat.id) || feat.id === this.currentFeatId
    );
  }

  onAdd(feat: Feat) {
    this.feats.push(feat);
    this.featsChange.emit(this.feats);
  }

  private search() {
    this.findFeatService
      .findFeats({fields: this.searchFields, offset: 0, limit: 10})
      .subscribe(res => (this.foundFeats = res.filtered));
  }
}
