import { ComponentPipelineBuilder } from '@/Core/component/ComponentHookBinder';
import { IDrawArg } from './drawArg';

/**
 * Генерируем сущность, которая позднее подпишется
 * на основные жизненние этапы компонента и таким образом определит
 * его поведение
 * @param arg
 * @returns
 */
export function generateLifecycle(arg: IDrawArg): ComponentPipelineBuilder {
  const builder = arg.builder;
  return builder;
}
