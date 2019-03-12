import {Component, OnDestroy} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';
import {DashboardService} from '../../dashboard.service';
import {Monster} from '../../../shared/model/monster';

const DEBOUNCE_TIME = 300;

@Component({
  templateUrl: './your-monsters.component.html',
  styleUrls: ['../owner-panel-common.scss'],
})
export class YourMonstersComponent implements OnDestroy {
  nameControl = this.formBuilder.control('');
  paginationControl = this.formBuilder.control(1);

  dataObs: Observable<{count: number; rows: Monster[]}>;

  itemsPerPage = 10;

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
  ) {
    this.subscription.add(
      Observable.combineLatest([
        this.nameControl.valueChanges
          .distinctUntilChanged()
          .debounceTime(DEBOUNCE_TIME),
        this.paginationControl.valueChanges.distinctUntilChanged(),
      ]).subscribe(([name, page]) => this.query(name, page)),
    );

    // NOTE: triggers for initial values
    this.nameControl.setValue('');
    this.paginationControl.setValue(1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(id: number) {
    this.dashboardService.deleteMonster(id).subscribe(() => {
      this.nameControl.setValue('');
      this.paginationControl.setValue(1);
      // this.query('', 1);
    }, console.error);
  }

  private query(name: string, page: number) {
    const offset = (page - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;

    this.dataObs = this.dashboardService.getUserMonsters(
      name,
      offset,
      limit,
      [],
      ['updatedAt'],
    );
  }
}
