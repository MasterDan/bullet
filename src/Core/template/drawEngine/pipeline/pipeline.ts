import { PipeNodeAsync } from './pipeNodeAsync';

export class Pipeline {
  _pipeline: PipeNodeAsync[] = [];
  push(...nodes: PipeNodeAsync[]): Pipeline {
    this._pipeline.push(...nodes);
    return this;
  }
}
