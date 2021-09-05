import { Emitter } from '@/Core/reactive/emitter';
import { Bullet } from '../../bullet';
import { BulletBuilder } from '../../bulletBuilder';
import { defaultDirectives } from '../directives/default/defaultDirectives';
import { ClassicDomParserInjector } from '../injectors/classicDomParserInjector';

export function createBulletApp<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
>(
  ctor: (builder: BulletBuilder<TProps, TEmits>) => void
): Bullet<TProps, TEmits> {
  const builder = new BulletBuilder<TProps, TEmits>();
  builder.use(ClassicDomParserInjector);
  defaultDirectives.forEach((d) => {
    builder.addDirective(new d());
  });
  ctor(builder);
  return builder.build();
}
