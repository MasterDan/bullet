import 'jest';
import { Reactive } from './reactive';
describe('Тесты класса reactive',()=>{
    test('Проверяем работу подписки', () => {
        const ref = new Reactive(5);
        let detector: string;
        ref.subscribe((val,old)=>{
            expect(val).toBe(8);
            expect(old).toBe(5);
            detector = `${old}-${val}`;
        })
        ref.value = 8;
        expect(detector).toBe('5-8')
      });
      test('Проверяем работу отписки',()=>{
        const ref = new Reactive(5);
        const detector: string = null;
        const token = ref.subscribe(()=>{
            throw new Error('Ошибка')
        })
        token.unsubscribe();
        ref.value = 8;
        expect(detector).toBeNull();      
      });
});
