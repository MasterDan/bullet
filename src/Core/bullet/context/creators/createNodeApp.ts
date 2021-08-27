import { Emitter } from '@/Core/reactive/emitter';
import { Bullet } from '../../bullet';
import { BulletBuilder } from '../../bulletBuilder';
import { JsDomParserInjector } from '../injectors/jsDomParserInjector';

export function createApp<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
>(
  ctor: (builder: BulletBuilder<TProps, TEmits>) => void
): Bullet<TProps, TEmits> {
  const builder = new BulletBuilder<TProps, TEmits>();
  builder.use(JsDomParserInjector);
  ctor(builder);
  return builder.build();
}
