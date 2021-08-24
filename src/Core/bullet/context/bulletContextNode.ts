import { JsDomStringParser } from '@/Core/template/stringParsers/JsDomStringParser';
import { IDomParser } from '@/Core/template/stringParsers/types';
import { IBulletContext } from './contextTypes';

export class bulletContextNode implements IBulletContext {
  parser: IDomParser = new JsDomStringParser();
}
