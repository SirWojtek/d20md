import {Component} from '@angular/core';
import {DashboardService} from '../dashboard.service';
import {EntityType} from '../../shared/model/entity';

@Component({
  templateUrl: './owner-panel.component.html',
  styleUrls: ['./owner-panel.component.scss'],
})
export class OwnerPanelComponent {
  entityType = EntityType;

  userEntitiesCountObs = this.dashboardService.getEntitiesCount();

  constructor(private dashboardService: DashboardService) {}
}
