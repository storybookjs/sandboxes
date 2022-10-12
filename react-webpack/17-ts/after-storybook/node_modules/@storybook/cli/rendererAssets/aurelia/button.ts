import { customElement, bindable } from 'aurelia';

@customElement({
  name: 'storybook-button-component',
  template: `
  <template>
    <button click.delegate="onClick($event)">\${label}</button>
    <style>
    button {
      border: 1px solid #eee;
      border-radius: 3px;
      background-color: #ffffff;
      cursor: pointer;
      font-size: 15px;
      padding: 3px 10px;
      margin: 10px;
    }
    </style>
    </template>
  `,
})
export default class Button {
  @bindable()
  label = '';

  @bindable()
  onClick: MouseEvent;
}
