import { Component } from '../component';

export const componentForTests = Component.create({
  template: '<div>Hello from Test</div>',
  definition: {
    props: {
      message: 'some message'
    },
    emits: {}
  },
  setup: (def) => {
    return {
      msg: def.props.message
    };
  }
});
