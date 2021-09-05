export abstract class PipeNodeAsync {
  abstract run<T>(): Promise<T>;
  constructor(public next?: PipeNodeAsync) {}
}
