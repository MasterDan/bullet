export interface IBulletContextArgs {
  /**
   * Просто чтобы линтер не ругался
   */
  state: string;
}

export class BulletContext {
  state: string;
  constructor(arg: IBulletContextArgs) {
    this.state = arg.state;
  }
}
