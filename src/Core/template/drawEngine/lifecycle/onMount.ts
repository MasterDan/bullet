import { IDrawArg, IDrawNodeArg, IDrawNodesArg } from './drawArg';

export function appendMoutHook(arg: IDrawArg): IDrawArg {
  return arg;
}

function drawSingleNode(arg: IDrawNodeArg): void {
  return;
}

function drawMultipleNodes(arg: IDrawNodesArg): void {
  return;
}
