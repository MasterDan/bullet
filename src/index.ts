import { Bullet } from './Core/bullet/bullet';
import { componentForTests } from './Core/component/sandbox/componentForTests';
console.log('Hello world!');
Bullet.create(componentForTests).mount('#app');
