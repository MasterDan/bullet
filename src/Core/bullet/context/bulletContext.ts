import { ClassicDomParser } from '@/Core/template/stringParsers/ClassicDomParser';
import { IDomParser } from '@/Core/template/stringParsers/types';
import { IBulletContext } from './contextTypes';

export interface IBulletContextArgs {
  parser: IDomParser;
}

export class BulletContext implements IBulletContext {
  parser: IDomParser = new ClassicDomParser();
}
