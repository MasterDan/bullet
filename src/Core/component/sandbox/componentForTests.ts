import { ComponentInterface } from '../сomponentInterface';
import { Component, implement, template } from './../component';

@implement({
  props: {
    message: 'This is from property'
  },
  emits: {}
})
@template('<div>Hello from test component</div>')
export class ComponentForTests extends Component {
  setup(def: ComponentInterface): Record<string, unknown> {
    const message = def.props.message;
    return {};
  }
}
