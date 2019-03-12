import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MonstersService} from '../monsters.service';
import {EnumService} from '../../shared/enum.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Monster} from '../../shared/model/monster';
import {typeAppliers, MonsterSubtype} from './type/monster-types';
import {slideInOutLeft} from '../../shared/animations';

@Component({
  templateUrl: './add-monster.component.html',
  styleUrls: ['./add-monster.component.scss'],
  animations: [slideInOutLeft],
})
export class AddMonsterComponent implements OnInit {
  error: string;

  monsterTypes: Observable<string[]> = this.enumService.getMonsterTypes();
  monsterSubtypes = Object.keys(MonsterSubtype).map(s => MonsterSubtype[s]);

  addMonsterForm = new FormGroup({
    nameControl: new FormControl('', Validators.required),
    typeControl: new FormControl(''),
    subtypeControl: new FormControl(this.monsterSubtypes[0]),
    hdControl: new FormControl(1),
  });

  constructor(
    private monstersService: MonstersService,
    private enumService: EnumService,
    private titleService: Title,
    private router: Router,
  ) {}

  ngOnInit() {
    this.titleService.setTitle('d20MD - Add Monster');
  }

  isTypeSelected(): boolean {
    return this.addMonsterForm.get('typeControl').value;
  }

  isElementalTypeSelected(): boolean {
    return this.addMonsterForm.get('typeControl').value === 'elemental';
  }

  onSubmit() {
    const name: string = this.addMonsterForm.get('nameControl').value;
    const type: string = this.addMonsterForm.get('typeControl').value;
    const subtype: MonsterSubtype = this.addMonsterForm.get('subtypeControl')
      .value;
    const hdAmount: number = this.addMonsterForm.get('hdControl').value;

    let newMonster = new Monster();
    newMonster.name = name;
    if (type) {
      newMonster.type = type;
      newMonster = typeAppliers[type].apply(newMonster, hdAmount, {subtype});
    }

    this.monstersService.addMonster(newMonster).subscribe(
      newId => this.router.navigateByUrl('/monsters/show/' + newId.toString()),
      err => {
        this.error = err[0].message.includes('unique')
          ? 'Monster with that name already exists'
          : err[0].message;
      },
    );
  }
}
