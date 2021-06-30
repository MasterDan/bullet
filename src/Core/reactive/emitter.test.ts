import 'jest';
import { Emitter } from './emitter';
import { Subscribtion } from './subscribtion';

describe('Emitter', () => {
  test('emit', () => {
      let tracker = '';
      const sub: Subscribtion<string> = jest.fn((val, old)=>{
          tracker = `${old}-${val}`;
      });
      const emitter = new Emitter<string>();
      const token = emitter.subscribe(sub);
      emitter.emit('foo','bar');
      expect(sub).toBeCalled();
      expect(tracker).toBe('bar-foo');
      token.unsubscribe();
      emitter.emit('x','x');
      expect(sub).toBeCalledTimes(1);
      expect(tracker).toBe('bar-foo');
  });
});
