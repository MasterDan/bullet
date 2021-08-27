import { createBulletApp } from './Core/bullet/context/creators/createApp';
import { componentForTests } from './Core/component/sandbox/componentForTests';
console.log('Hello world!');
createBulletApp((builder) => {
  builder.setRoot(componentForTests);
}).mount('#app');
