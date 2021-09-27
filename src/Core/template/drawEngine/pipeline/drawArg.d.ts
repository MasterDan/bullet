import { BulletContext } from '@/Core/bullet/context/bulletContext';
import { ComponentPipelineBuilder } from '@/Core/component/ComponentHookBinder';
import { BulletNode } from '../../bulletNode';

export interface IDrawNodeArg {
  node: BulletNode;
  context: BulletContext;
  builder: ComponentPipelineBuilder;
  parentNode?: BulletNode;
}

export interface IDrawArg {
  nodes: BulletNode[];
  context: BulletContext;
  builder: ComponentPipelineBuilder;
}
