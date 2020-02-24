import { ITemplate } from '@typings/Template';

export interface ITab {
  id: number;
  name?: string;
  template?: ITemplate;
}
