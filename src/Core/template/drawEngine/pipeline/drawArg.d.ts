import { BulletContext } from '@/Core/bullet/context/bulletContext';
import { ComponentPipelineBuilder } from '@/Core/component/ComponentHookBinder';
import { BulletNode } from '../../bulletNode';
import { BulletNodeRenderer } from '../drawEngine';

export interface IDrawNodeArg {
  node: BulletNode;
  context: BulletContext;
  builder: ComponentPipelineBuilder;
  parentNode?: BulletNode;
  resultAccumulator?: BulletNodeRenderer[];
}

export interface IDrawArg {
  nodes: BulletNode[];
  context: BulletContext;
  parentNode?: BulletNode;
  builder: ComponentPipelineBuilder;
}
