import { BulletContext } from '@/Core/bullet/context/bulletContext';
import { ComponentPipelineBuilder } from '@/Core/component/ComponentHookBinder';
import { BulletNode } from '../../bulletNode';

export interface IDrawNodeArg {
  node: BulletNode;
  context: BulletContext;
  parentNode?: BulletNode;
  builder: ComponentPipelineBuilder;
}
export interface IDrawNodePipeArg {
  node: BulletNode;
  context: BulletContext;
  parentNode?: BulletNode;
}

export interface IDrawNodesArg {
  node: BulletNode;
  context: BulletContext;
  builder: ComponentPipelineBuilder;
  parentNode?: BulletNode;
}

export interface IDrawArg {
  nodes: BulletNode[];
  context: BulletContext;
  parentNode?: BulletNode;
  builder: ComponentPipelineBuilder;
}
