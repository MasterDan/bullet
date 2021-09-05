import { PipeNodeAsync } from './pipeNodeAsync';

export class Pipeline {
  _pipeline: PipeNodeAsync[] = [];
  push(...nodes: PipeNodeAsync[]): Pipeline {
    this._pipeline.push(...nodes);
    for (let i = 0; i < this._pipeline.length - 1; i++) {
      this._pipeline[i].next = this._pipeline[i + 1];
    }
    return this;
  }
  async run(): Promise<unknown> {
    return this._pipeline[0].run();
  }
}
