import { Reactive } from './reactive';
type worker<T> = (elem: T, index: number) => void;
type mapper<T> = (elem: T, index: number) => T;
export class ReactiveArray<T> extends Reactive<Array<Reactive<T>>> {
  constructor(value: T[]) {
    super(
      value.map((el) => {
        const result = new Reactive(el);
        result.subscribe(() => {
          this.notifyChanged(this.value);
        });
        return result;
      })
    );
  }
  valueOf(index: number, newVal?: T): T | void {
    const elem = this.value[index];
    if (newVal != null) {
      elem.value = newVal;
    } else {
      return elem.value;
    }
  }
  push(item: T): void {
    this.value.push(new Reactive(item));
    this.notifyChanged(this.value);
  }
  forEach(arg: worker<T>): void {
    this.value.forEach((el, index) => {
      arg(el.value, index);
    });
  }
  map(arg: mapper<T>): void {
    this.value.forEach((el, index) => {
      el.value = arg(el.value, index);
    });
  }
}
