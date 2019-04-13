import {Component} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MonstersService} from '../monsters/monsters.service';
import {SpellsService} from '../spells/spells.service';
import {FeatsService} from '../feats/feats.service';
import {StartCasePipe} from '../shared/elements/pipes';

interface ICustomUrlName {
  matchingUrl: RegExp;
  resolveFunc: (urlPart: string) => Observable<string>;
}

interface IBreadcrumbItem {
  href: string;
  name: Observable<string>;
}

@Component({
  selector: 'd20md-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent {
  itemsObs: Observable<IBreadcrumbItem[]>;

  private customUrlMapping: ICustomUrlName[] = [
    {
      matchingUrl: /monsters\/show\/\d+$/,
      resolveFunc: urlPart => {
        return this.monstersService.getMonster(+urlPart, null).map(m => m.name);
      },
    },
    {
      matchingUrl: /monsters\/show\/\d+\/special$/,
      resolveFunc: () => Observable.of('Special Abilities'),
    },
    {
      matchingUrl: /spells\/show\/\d+$/,
      resolveFunc: urlPart => {
        return this.spellsService.getSpell(+urlPart).map(m => m.name);
      },
    },
    {
      matchingUrl: /feats\/show\/\d+$/,
      resolveFunc: urlPart => {
        return this.featsService.getFeat(+urlPart).map(m => m.name);
      },
    },
    {
      matchingUrl: /activate\//,
      resolveFunc: () => Observable.of(''),
    },
    {
      matchingUrl: /change-password\//,
      resolveFunc: () => Observable.of(''),
    },
  ];

  constructor(
    router: Router,
    private startCasePipe: StartCasePipe,
    private monstersService: MonstersService,
    private spellsService: SpellsService,
    private featsService: FeatsService,
  ) {
    this.itemsObs = router.events
      .filter(e => e instanceof NavigationEnd)
      .map((e: NavigationEnd) => {
        return this.mapRoute(e.url.split('/'));
      });
  }

  private mapRoute(url: string[]): IBreadcrumbItem[] | null {
    const mappedPath = url.filter(urlPart => !!urlPart).reduce(
      (res, urlPart) => {
        const previousHref = res.length ? res[res.length - 1].href : '';
        const href = `${previousHref}/${urlPart}`;
        return [...res, {href, name: this.determineNameForUrl(href, urlPart)}];
      },
      [] as IBreadcrumbItem[],
    );

    if (!mappedPath.length) {
      return null;
    }

    return [{href: '/', name: Observable.of('d20md')}, ...mappedPath];
  }

  private determineNameForUrl(
    absoluteUrl: string,
    urlPart: string,
  ): Observable<string> {
    const urlMapping = this.customUrlMapping.find(m =>
      m.matchingUrl.test(absoluteUrl),
    );
    if (!urlMapping) {
      return Observable.of(this.startCasePipe.transform(urlPart));
    }

    return urlMapping.resolveFunc(urlPart);
  }
}
