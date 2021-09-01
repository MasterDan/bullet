export abstract class PipeNodeAsync {
  abstract run<T>(): Promise<T>;
  constructor(private next?: PipeNodeAsync) {}
}
