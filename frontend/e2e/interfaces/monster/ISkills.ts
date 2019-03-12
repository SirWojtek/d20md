export interface ISkill {
  modifier: number;
  total: number;
}

export interface ISkills {
  hide?: ISkill;
  listen?: ISkill;
  moveSilently?: ISkill;
  spot?: ISkill;
  survival?: ISkill;
}
