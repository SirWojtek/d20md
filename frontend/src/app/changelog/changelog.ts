export interface IChange {
  title: string;
  date: Date;
  content: string;
}

export const changelog: IChange[] = [
  {
    title: 'Updated links after moving to Github',
    date: new Date('2019-03-18'),
    content: `
    Updated links in the footer after moving d20md repository to Github.
    `,
  },
  {
    title: 'Reset & change password pages',
    date: new Date('2019-03-10'),
    content: `
    From now (at last!) users can reset their password using the registration email.
    The change password feature is also available for loged in users.
    `,
  },
  {
    title: 'Monster type',
    date: new Date('2019-02-26'),
    content: `
    From now you can apply a type during a monster creation and afterwards.
    This will result in generation of some type-based parameters like saves, hit dices etc.
    `,
  },
  {
    title: 'Recent activity dashboard section',
    date: new Date('2019-02-13'),
    content: `
    Introduced the recent activity section available in the user dashboard
    on which user can see lastly showed monsters, spells and feats.
    `,
  },
  {
    title: 'Further db work',
    date: new Date('2019-02-10'),
    content: `
    Fixed the rest of wrongly imported enums.
    `,
  },
  {
    title: 'Total views metric',
    date: new Date('2019-02-02'),
    content: `
    Added the popular item panel for dashboard which shows monsters, spells and feats
    with the greatest number of views.
    Added Views column for the owner panel.
    `,
  },
  {
    title: 'User dashboard',
    date: new Date('2019-01-23'),
    content: `
    Implemented the user dashboard - the place in where a user can view his
    monsters, spells and feats and manage them.
    `,
  },
  {
    title: 'Backend stability fixes',
    date: new Date('2019-01-23'),
    content: `
    Found and fixed many issues caused by incorrectly imported database.
    The fix improves working of the find pages.
    `,
  },
  {
    title: 'Breadcrumbs and show pages fixes',
    date: new Date('2019-01-06'),
    content: `
    Added breadcrumbs which help users the navigation on the site.
    Simplified the structure of the show pages and intrudced URL for the monster show page tabs.
    Redesigned a monster spellbook and a feats tab.
    `,
  },
  {
    title: 'Improved layout for mobile + quick search',
    date: new Date('2018-12-22'),
    content: `
    Redesigned layout to be more mobile friendly. This change touched mainly the navbar and find pages.
    Introduced the quick search input in the navbar to speed up searching.
    `,
  },
  {
    title: 'd20 database corrections',
    date: new Date('2018-12-17'),
    content: `
    Fixed wrongly imported saves and skills (total values was imported as base values).
    Added missing armor types for imported monsters.
    `,
  },
  {
    title: 'E2E tests + minor fixes',
    date: new Date('2018-12-11'),
    content: `
    Update after a long time. UX does not change much, only added auto scroll to the top of
    the page after navigation but I introduced e2e tests wchich will help me with regression checks.
    `,
  },
  {
    title: 'GraphQL',
    date: new Date('2018-04-25'),
    content: `
    Replaced majority of API with GraphQL which drastically increased query speed.
    Tweaked existing update requests and change some UI design.
    `,
  },
  {
    title: 'UX improvements',
    date: new Date('2018-04-03'),
    content: `
    Hover and click changes for all find pages.
    Fixed background for the feat section along with colors.
    `,
  },
  {
    title: 'Loader',
    date: new Date('2018-03-12'),
    content: `
    Introduced loader which appears when there are pending requests. Beside of that,
    replaced almost whole http communication model.
    `,
  },
  {
    title: 'Major style change',
    date: new Date('2018-02-24'),
    content: `
    Replaced inline forms with modals (in show pages), unified layout in whole website,
    improved visibiliy on small devices.
    `,
  },
  {
    title: 'Bugfixes',
    date: new Date('2018-02-20'),
    content: `
    Improved CORS handling, updated dependencies
    and fixed conversion to JSON on browser side.
    `,
  },
  {
    title: 'Changelog',
    date: new Date('2018-02-16'),
    content: `
    Created this page to keeps new feature visible for the users.
    `,
  },
  {
    title: 'Monster skill sort',
    date: new Date('2018-02-16'),
    content: `
    Introduced possibility to sort monster skills by rank both in
    the show table and edit form.
    `,
  },
  {
    title: 'Find feat page',
    date: new Date('2018-02-15'),
    content: `
      New design for the find feat page similar to the monster and spell.
      Now you can found feats by phrase (which will be looking either in a feat name
      and all text description) and by type.
    `,
  },
];
