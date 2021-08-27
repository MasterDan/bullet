import { BulletContext } from '../bulletContext';

export abstract class ContextInjector {
  abstract inject(context: BulletContext): BulletContext;
}

export type ContextInjectorConstructor = new (...args) => ContextInjector;
