import { ComponentPipelineBuilder } from '@/Core/component/ComponentHookBinder';
import { IDrawArg } from './drawArg';
import { appendMoutHook } from './onMount';

/**
 * Генерируем сущность, которая позднее подпишется
 * на основные жизненние этапы компонента и таким образом определит
 * его поведение
 * @param arg
 * @returns
 */
export function generateLifecycle(arg: IDrawArg): ComponentPipelineBuilder {
  const argAfterMount = appendMoutHook(arg);
  const builder = argAfterMount.builder;
  return builder;
}
