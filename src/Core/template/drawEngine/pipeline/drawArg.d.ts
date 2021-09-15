import { BulletContext } from '@/Core/bullet/context/bulletContext';
import { ComponentPipelineBuilder } from '@/Core/component/ComponentHookBinder';
import { BulletNode } from '../../bulletNode';

export interface IDrawArg {
  node: BulletNode;
  context: BulletContext;
  bulder: ComponentPipelineBuilder;
}
