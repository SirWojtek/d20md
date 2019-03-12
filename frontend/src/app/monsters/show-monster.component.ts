import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll';
import {Monster} from '../shared/model/monster';
import {UserService} from '../shared/user/user.service';
import {MonstersService} from './monsters.service';

@Component({
  templateUrl: './show-monster.component.html',
  styleUrls: ['./show-monster.component.scss'],
})
export class ShowMonsterComponent implements OnInit, OnDestroy {
  monster: Monster;
  canModify: boolean;
  isLoggedIn: boolean;

  private routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private monstersService: MonstersService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params
      .flatMap(params =>
        this.monstersService.getMonster(+params['id'], 'basic'),
      )
      .subscribe((monster: Monster) => {
        this.monster = monster;
        this.titleService.setTitle(
          'd20MD - View Monsters - ' + this.monster.name,
        );
        this.setPermisions();
      });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onDescriptionSave() {
    this.monstersService
      .updateMonster({
        id: this.monster.id,
        description: this.monster.description,
      })
      .subscribe(updated => (this.monster.description = updated.description));
  }

  onFeatsSave() {
    this.monstersService
      .updateMonster({id: this.monster.id, Feats: this.monster.Feats})
      .subscribe(updated => (this.monster.Feats = updated.Feats));
  }

  onDeleteMonster() {
    this.monstersService
      .deleteMonster(this.monster.id)
      .subscribe(() => this.router.navigateByUrl('monsters/find'));
  }

  private setPermisions() {
    this.userService
      .canEdit(this.monster)
      .subscribe(canEdit => (this.canModify = canEdit));
  }
}
