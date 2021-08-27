import { ClassicDomParser } from '@/Core/template/stringParsers/ClassicDomParser';
import { BulletContext } from '../bulletContext';
import { ContextInjector } from './bulletContextInjector';

export class ClassicDomParserInjector extends ContextInjector {
  inject(context: BulletContext): BulletContext {
    context.parser = new ClassicDomParser();
    return context;
  }
}
