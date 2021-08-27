import { JsDomStringParser } from '@/Core/template/stringParsers/JsDomStringParser';
import { BulletContext } from '../bulletContext';
import { ContextInjector } from './bulletContextInjector';

export class JsDomParserInjector extends ContextInjector {
  inject(context: BulletContext): BulletContext {
    context.parser = new JsDomStringParser();
    return context;
  }
}
