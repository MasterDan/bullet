import { IDomParser } from '@/Core/template/stringParsers/types';
import { BulletDirective } from './directives/bulletDirective';

export interface IBulletContextArgs {
  parser: IDomParser;
}

export class BulletContext {
  parser: IDomParser;
  directives: BulletDirective<unknown>[] = [];
}
