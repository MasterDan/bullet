import { BulletContext } from '@/Core/bullet/context/bulletContext';
import { Component } from '@/Core/component/component';
import { ComponentCompiled } from '@/Core/component/componentCompiled';
import { ComponentPipelineBuilder } from '@/Core/component/ComponentHookBinder';
import { Emitter } from '@/Core/reactive/emitter';
import { isNullOrEmty } from '@/Core/tools/string';
import { HtmlParser } from '../templateParser';
import { generateLifecycle } from './lifecycleGenerator';

export function compileComponent<
  TProps extends Record<string, unknown>,
  TEmits extends Record<string, Emitter<unknown>>
>(
  component: Component<TProps, TEmits>,
  context: BulletContext
): ComponentCompiled<TProps, TEmits> {
  const parser = new HtmlParser(context);
  if (isNullOrEmty(component.__template)) {
    throw new Error('Template must exist in component!');
  }
  const nodes = parser.parseHtml(component.__template);
  const lifecycle = generateLifecycle({
    builder: new ComponentPipelineBuilder(),
    context,
    nodes
  });
  const result = new ComponentCompiled<TProps, TEmits>();
  result.__interface = component.__interface;
  result.__data = component.__data;
  result.__hooks = component.__hooks;
  result.__setup = component.__setup;
  result.__lifecycle = lifecycle.build();
  throw new Error('Not implemented');
}
