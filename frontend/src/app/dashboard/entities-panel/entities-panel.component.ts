import {Component, Input} from '@angular/core';
import {IEntity} from '../../shared/model/entity';
import {FormControl} from '@angular/forms';
import {getEntityColor} from '../../shared/colors';
import {getEntityShowPageLink} from '../../shared/links';

@Component({
  selector: 'd20md-entities-panel',
  templateUrl: './entities-panel.component.html',
  styleUrls: ['./entities-panel.component.scss'],
})
export class EntitiesPanelComponent {
  @Input()
  title: string;
  @Input()
  entities: IEntity[] = [];
  @Input()
  itemsPerPage = 5;

  paginationControl = new FormControl(1);

  getColor = getEntityColor;
  getLink = getEntityShowPageLink;

  getPage(): IEntity[] {
    const page = this.paginationControl.value;
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return this.entities.slice(start, end);
  }
}
