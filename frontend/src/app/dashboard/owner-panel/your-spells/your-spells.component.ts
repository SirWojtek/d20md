import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Spell} from '../../../shared/model/spell';
import {FormBuilder} from '@angular/forms';
import {DashboardService} from '../../dashboard.service';
import {EnumService} from '../../../shared/enum.service';

const DEBOUNCE_TIME = 300;

@Component({
  templateUrl: './your-spells.component.html',
  styleUrls: ['../owner-panel-common.scss', './your-spells.component.scss'],
})
export class YourSpellsComponent implements OnDestroy {
  nameControl = this.formBuilder.control('');
  typeControl = this.formBuilder.control('');
  paginationControl = this.formBuilder.control(1);

  dataObs: Observable<{count: number; rows: Spell[]}>;
  spellTypes: Observable<string[]> = this.enumService.getSpellTypes();

  itemsPerPage = 10;

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private enumService: EnumService,
    private dashboardService: DashboardService,
  ) {
    this.subscription.add(
      Observable.combineLatest([
        this.nameControl.valueChanges
          .distinctUntilChanged()
          .debounceTime(DEBOUNCE_TIME),
        this.typeControl.valueChanges.distinctUntilChanged(),
        this.paginationControl.valueChanges.distinctUntilChanged(),
      ]).subscribe(([name, type, page]) => this.query(name, type, page)),
    );

    // NOTE: triggers for initial values
    this.resetControls();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(id: number) {
    this.dashboardService.deleteSpell(id).subscribe(() => {
      this.resetControls();
    }, console.error);
  }

  private resetControls() {
    this.nameControl.setValue('');
    this.typeControl.setValue('');
    this.paginationControl.setValue(1);
  }

  private query(name: string, type: string, page: number) {
    const offset = (page - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;

    this.dataObs = this.dashboardService.getUserSpells(
      name,
      type,
      offset,
      limit,
      [],
      ['updatedAt'],
    );
  }
}
